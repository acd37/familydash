module.exports = function(app) {
  const db = require('../models');
  const passport = require('passport');

  // @route GET api/family/test
  // @desc tests the users api route
  app.get('/api/family/test', (req, res) => {
    res.json({
      success: true,
      msg: 'Testing endpoint works correctly.'
    });
  });

  //@route  GET api/family
  //@desc get current family
  app.get('/api/family', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};

    db.family
      .findOne({
        where: {
          familyCode: req.user.familyCode
        }
      })
      .then((family) => {
        console.log(family.familyCode);
        if (!family) {
          errors.noProfile = 'There is no family for this user.';
          return res.status(404).json(errors);
        }
        res.json(family);
      })
      .catch((err) => res.status(404).json(err));
  });

  // @route POST  api/family
  // @desc creates new family
  app.post('/api/family', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { familyName } = req.body;
    const { id } = req.user;

    // Find user by email
    db.user
      .findOne({ where: { id } })
      .then((user) => {
        // Check the user exists
        if (user.familyCode) {
          return res.status(404).json({ msg: 'User is already assigned a family' });
        }

        const newFamily = {
          familyName
        };

        db.family
          .create(newFamily)
          .then((family) => {
            user
              .update({
                familyId: family.id,
                familyCode: family.familyCode
              })
              .then(() => {
                return db.user.findOne({ where: { id: user.id }, include: [{ model: db.family }] });
              })
              .then((user) => {
                res.status(200).json({
                  user,
                  message: 'Family successfully created.',
                  familyCreated: true
                });
              });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });

  // @route POST  api/family/join
  // @desc adds a new user to an existig family
  app.post('/api/family/join', passport.authenticate('jwt', { session: false }), (req, res) => {
    // const { familyCode } = req.body;
    console.log(req.body.familyCode);
    db.family
      .findOne({
        where: {
          familyCode: req.body.familyCode
        }
      })
      .then((family) => {
        db.user
          .update(
            {
              familyCode: family.familyCode,
              familyId: family.id
            },
            {
              where: {
                id: req.user.id
              }
            }
          )
          .then(() => {
            res.status(200).json({
              user: 'User had successfully joined a family.',
              updatedUser: true
            });
          })
          .catch((err) => {
            res.status(500).json({
              user: 'User could not be added to the family at thistime'
            });
          });
      });
  });

  app.post('/api/family/ynabKey', passport.authenticate('jwt', { session: false }), (req, res) => {
    const financeKey = req.body.financeKey;
    const budgetId = req.body.budgetId;

    db.family
      .update({ financeKey, budgetId }, { where: { familyCode: req.user.familyCode } })
      .then((isUpdated) => {
        if (isUpdated) {
          res.json(isUpdated);
        }
      })
      .catch((err) => console.log(err));
  });
};
