module.exports = function(app) {
  const db = require('../models');
  const passport = require('passport');

  // @route GET api/users/test
  // @desc tests the users api route
  app.get('/api/todo/test', (req, res) => {
    res.json({
      success: true,
      msg: 'Testing endpoint works correctly.'
    });
  });

  // @route  POST api/todo
  // @desc creates a  todo item
  app.post('/api/todo', passport.authenticate('jwt', { session: false }), (req, res) => {
    const todo = {
      familyId: req.body.familyId,
      description: req.body.description,
      isCompleted: false
    };

    db.todo.create(todo).then(() =>
      db.todo
        .findAll({
          where: {
            familyId: req.body.familyId
          }
        })
        .then((todos) => {
          res.status(200).json(todos);
        })
        .catch((err) => {
          res.status(500).json(err);
        })
    );
  });

  // @route  GET api/todo/:familyId
  // @desc gets all todos
  app.get('/api/todo/:familyId', passport.authenticate('jwt', { session: false }), (req, res) => {
    db.todo
      .findAll({
        where: {
          familyId: req.params.familyId
        }
      })
      .then((todos) => {
        res.json(todos);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // @route  PUT api/todo/:id
  // @desc updates a todo item
  app.put('/api/todo/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const updatedTodo = {
      description: req.body.todo,
      isCompleted: req.body.isCompleted,
      assignedUser: req.body.assignedUser,
      familyId: req.body.familyId
    };

    db.todo.update(updatedTodo, { where: { id: req.params.id } }).then(() => {
      db.todo
        .findAll({
          where: {
            familyId: req.body.familyId
          }
        })
        .then((todos) => {
          res.status(200).json(todos);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    });
  });

  // @route  DELETE api/todo/:id
  // @desc deletes a todo item
  app.delete(
    '/api/todo/:id/:familyId',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      db.todo
        .destroy({ where: { id: req.params.id } })
        .then((status) => {
          if (status === 1) {
            db.todo
              .findAll({ where: { familyId: req.params.familyId } })
              .then((todos) => {
                res.status(200).json(todos);
              })
              .catch((err) => res.status(500).json(err));
          }
        })
        .catch((err) => console.log(err));
    }
  );
};
