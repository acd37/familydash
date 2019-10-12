module.exports = function(app) {
  const db = require('../models');
  const passport = require('passport');
  const { transporter, readHTMLFile } = require('../mailservice/mailConfig');
  const handlebars = require('handlebars');
  const path = require('path');

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
    console.log(req.body);
    const updatedTodo = {
      description: req.body.description,
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
          console.log(updatedTodo);

          db.user.findOne({ where: { id: updatedTodo.assignedUser } }).then((user) => {
            readHTMLFile(path.join(__dirname, '../public/pages/email.html'), (err, html) => {
              const template = handlebars.compile(html);
              const replacements = {
                username: user.firstName,
                task: updatedTodo.description
              };

              const htmlToSend = template(replacements);

              const mailOptions = {
                from: 'FamilyDash',
                to: user.email,
                subject: `New Task Assigned: ${updatedTodo.description}`,
                generateTextFromHTML: true,
                html: htmlToSend
              };

              transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                  console.log(error);
                  res.status(400).json({
                    error: "We couldn't send an email"
                  });
                } else {
                  console.log('Email sent!');
                  res.status(200).json({
                    success: 'We sent an email'
                  });
                }
              });
            });
          });

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
