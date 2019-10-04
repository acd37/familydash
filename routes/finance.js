module.exports = function(app) {
  const db = require('../models');
  const passport = require('passport');
  const ynab = require('ynab');

  // @route GET api/users/test
  // @desc tests the users api route
  app.get('/api/finance/test', (req, res) => {
    res.json({
      success: true,
      msg: 'Testing endpoint works correctly.'
    });
  });

  // @route GET api/budget/categories
  // @desc gets budget categories from ynab
  app.get(
    '/api/finance/categories',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      db.family
        .findOne({
          where: {
            familyCode: req.user.familyCode
          }
        })
        .then((family) => {
          const accessToken = family.financeKey;
          const ynabAPI = new ynab.API(accessToken);

          const budgetResponse = ynabAPI.categories
            .getCategories(family.budgetId)
            .then((response) => {
              const categories = response.data.category_groups;
              res.json(categories);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => console.log(err));
    }
  );
};
