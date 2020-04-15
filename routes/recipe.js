module.exports = function(app) {
    const db = require('../models');
    const passport = require('passport');

    // @route GET api/recipe/test
    // @desc tests the recipes api route
    app.get('/api/recipe/test', (req, res) => {
        res.json({
            success: true,
            msg: 'Testing endpoint works correctly.'
        });
    });

    // @route  POST api/todo
    // @desc creates a  todo item
    app.post('/api/recipe', passport.authenticate('jwt', { session: false }), (req, res) => {
        const recipe = {
            familyId: req.user.familyId,
            name: req.body.name,
            prepTime: req.body.prepTime,
            description: req.body.description,
            ingredients: JSON.stringify(req.body.ingredients),
            instructions: JSON.stringify(req.body.instructions),
            cookTime: req.body.cookTime,
            image: req.body.image,
            calorieCount: req.body.calorieCount
        };

        db.recipe.create(recipe).then(() =>
            db.recipe
                .findAll({
                    where: {
                        familyId: req.user.familyId
                    }
                })
                .then(recipes => {
                    res.status(200).json(recipes);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                })
        );
    });

    // @route  GET api/recipe/:familyId
    // @desc gets all recipes
    app.get('/api/recipe/', passport.authenticate('jwt', { session: false }), (req, res) => {
        db.recipe
            .findAll({
                where: {
                    familyId: req.user.familyId
                }
            })
            .then(recipes => {
                res.json(recipes);
            })
            .catch(err => {
                console.log(err);
            });
    });

    // @route  GET api/recipe/:id
    // @desc gets a recipe item
    app.get(
        '/api/recipe/individual/:id',
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            console.log(req.params.id);
            db.recipe
                .findOne({
                    where: {
                        id: req.params.id
                    }
                })
                .then(recipe => {
                    const formattedRecipe = {
                        name: recipe.name,
                        description: recipe.description,
                        calorieCount: recipe.caloriteCount,
                        cookTime: recipe.cookTime,
                        prepTime: recipe.prepTime,
                        ingredients: JSON.parse(recipe.ingredients),
                        instructions: JSON.parse(recipe.instructions),
                        image: recipe.image
                    };
                    console.log(recipe);
                    res.status(200).json(formattedRecipe);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        }
    );

    // @route  PUT api/recipe/:id
    // @desc updates a recipe item
    app.put('/api/recipe/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        const updatedRecipe = {
            calendar: req.body.calendar,
            name: req.body.name,
            description: req.body.description,
            ingredients: JSON.stringify(req.body.ingredients),
            instructions: JSON.stringify(req.body.instructions),
            cookTime: req.body.cookTime,
            image: req.body.image,
            calorieCount: req.body.calorieCount
        };

        db.recipe.update(updatedRecipe, { where: { id: req.params.id } }).then(() => {
            db.recipe
                .findOne({
                    where: {
                        id: req.params.id
                    }
                })
                .then(recipe => {
                    const formattedRecipe = {
                        name: recipe.name,
                        description: recipe.description,
                        calorieCount: recipe.caloriteCount,
                        cookTime: recipe.cookTime,
                        prepTime: recipe.prepTime,
                        ingredients: JSON.parse(recipe.ingredients),
                        instructions: JSON.parse(recipe.instructions),
                        image: recipe.image
                    };
                    console.log(formattedRecipe);
                    res.status(200).json(formattedRecipe);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        });
    });

    // @route  DELETE api/recipe/:id
    // @desc deletes a recipe item
    app.delete(
        '/api/recipe/:id/:familyId',
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            db.recipe.destroy({ where: { id: req.params.id } }).then(status => {
                if (status === 1) {
                    db.recipe
                        .findAll({ where: { familyId: req.params.familyId } })
                        .then(recipes => {
                            res.status(200).json(recipes);
                        })
                        .catch(err => res.status(500).json(err));
                }
            });
        }
    );

    //  @route GET api/recipe/calendar
    // @desc gets all recipes marked as calendar items
    app.get(
        '/api/recipe/meals/calendar',
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            db.recipe
                .findAll({
                    where: {
                        familyId: req.user.familyId,
                        calendar: true
                    }
                })
                .then(recipes => {
                    res.status(200).json(recipes);
                })
                .catch(err => res.status(500).json(err));
        }
    );
};
