module.exports = function(app) {
    const bcrypt = require('bcryptjs');
    const db = require('../models');
    const passport = require('passport');
    const gravatar = require('gravatar');

    // @route GET api/users/test
    // @desc tests the users api route
    app.get('/api/user/test', (req, res) => {
        res.json({
            success: true,
            msg: 'Testing endpoint works correctly.'
        });
    });

    // @route GET api/user
    // @desc gets current user profile
    app.get('/api/user', passport.authenticate('jwt', { session: false }), async (req, res) => {
        await db.user
            .findOne({
                where: {
                    id: req.user.id
                }
            })
            .then(user => res.json(user));
    });

    // @route GET api/user/all
    // @desc gets all logged in users' family users
    app.get('/api/user/all', passport.authenticate('jwt', { session: false }), (req, res) => {
        db.user
            .findAll({
                where: {
                    familyCode: req.user.familyCode
                }
            })
            .then(users => res.json(users));
    });

    // @route PUT api/users/
    // @desc updates a user
    app.put('/api/user', passport.authenticate('jwt', { session: false }), (req, res) => {
        db.user
            .update(
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email
                },
                {
                    where: {
                        id: req.user.id
                    }
                }
            )
            .then(isUpdated => {
                if (isUpdated) {
                    db.user
                        .findOne({
                            where: {
                                id: req.user.id
                            }
                        })
                        .then(user => {
                            let updatedUser = user.get();
                            console.log(updatedUser);
                            res.json(updatedUser);
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
    });

    // @route POST api/users/
    // @desc creates a new user
    app.post('/api/user', (req, res) => {
        db.user
            .findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(user => {
                if (user) {
                    return res.status(400).json({ email: 'This email already exists.' });
                } else {
                    const thumbnail = gravatar.url(req.body.email, {
                        s: '200',
                        r: 'pg',
                        d: 'mm'
                    });

                    const newUser = {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: req.body.password,
                        thumbnail
                    };

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;

                            db.user
                                .create(newUser)
                                .then(user => {
                                    res.status(200).json({
                                        message: 'User account successfully created.',
                                        userCreated: true
                                    });
                                })
                                .catch(err => console.log(err));
                        });
                    });
                }
            });
    });
};
