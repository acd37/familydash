module.exports = function(app) {
    const db = require('../models');
    const passport = require('passport');

    // @route GET api/users/test
    // @desc tests the users api route
    app.get('/api/date/test', (req, res) => {
        res.json({
            success: true,
            msg: 'Testing endpoint works correctly.'
        });
    });

    // @route  POST api/date
    // @desc creates a  date item
    app.post('/api/date', passport.authenticate('jwt', { session: false }), (req, res) => {
        const date = {
            familyId: req.body.familyId,
            description: req.body.description,
            date: req.body.date,
            type: req.body.type
        };

        db.date.create(date).then(() =>
            db.date
                .findAll({
                    where: {
                        familyId: req.body.familyId
                    }
                })
                .then(dates => {
                    res.status(200).json(dates);
                })
                .catch(err => {
                    res.status(500).json(err);
                })
        );
    });

    // @route  GET api/date/:familyId
    // @desc gets all dates
    app.get('/api/date/:familyId', passport.authenticate('jwt', { session: false }), (req, res) => {
        db.date
            .findAll({
                where: {
                    familyId: req.params.familyId
                }
            })
            .then(dates => {
                res.json(dates);
            })
            .catch(err => {
                console.log(err);
            });
    });

    // @route  PUT api/date/:id
    // @desc updates a date item
    app.put('/api/date/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        const updatedDate = {
            description: req.body.description,
            date: req.body.date,
            type: req.body.type,
            familyId: req.body.familyId
        };

        db.date.update(updatedDate, { where: { id: req.params.id } }).then(() => {
            db.date
                .findAll({
                    where: {
                        familyId: req.body.familyId
                    }
                })
                .then(dates => {
                    res.status(200).json(dates);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        });
    });

    // @route  DELETE api/date/:id
    // @desc deletes a date item
    app.delete(
        '/api/date/:id/:familyId',
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            db.date
                .destroy({ where: { id: req.params.id } })
                .then(status => {
                    if (status === 1) {
                        db.date
                            .findAll({ where: { familyId: req.params.familyId } })
                            .then(dates => {
                                res.status(200).json(dates);
                            })
                            .catch(err => res.status(500).json(err));
                    }
                })
                .catch(err => console.log(err));
        }
    );
};
