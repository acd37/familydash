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
      familyId: req.body.familyId,
      name: req.body.name,
      description: req.body.description,
      ingredients: req.body.ingredients,
      cookTime: req.body.cookTime,
      image: req.body.image,
      calorieCount: req.body.calorieCount
    };

    db.recipe.create(recipe).then(() =>
      db.recipe
        .findAll({
          where: {
            familyId: req.body.familyId
          }
        })
        .then((recipes) => {
          res.status(200).json(recipes);
        })
        .catch((err) => {
          res.status(500).json(err);
        })
    );
  });

  // @route  GET api/todo/:familyId
  // @desc gets all todos
  app.get('/api/recipe/:familyId', passport.authenticate('jwt', { session: false }), (req, res) => {
    db.recipe
      .findAll({
        where: {
          familyId: req.params.familyId
        }
      })
      .then((recipes) => {
        res.json(recipes);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // @route  PUT api/todo/:id
  // @desc updates a todo item
  app.put('/api/recipe/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const updatedRecipe = {
      familyId: req.body.familyId,
      name: req.body.name,
      description: req.body.description,
      ingredients: req.body.ingredients,
      cookTime: req.body.cookTime,
      image: req.body.image,
      calorieCount: req.body.calorieCount
    };

    db.recipe.update(updatedRecipe, { where: { id: req.params.id } }).then(() => {
      db.recipe
        .findAll({
          where: {
            familyId: req.body.familyId
          }
        })
        .then((recipes) => {
          res.status(200).json(recipes);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    });
  });

  // @route  DELETE api/todo/:id
  // @desc deletes a todo item
  app.delete(
    '/api/recipe/:id/:familyId',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      db.recipe.destroy({ where: { id: req.params.id } }).then(
        db.recipe
          .findAll({ where: { familyId: req.params.familyId } })
          .then((recipes) => {
            res.status(200).json(recipes);
          })
          .catch((err) => res.status(500).json(err))
      );
    }
  );
};
