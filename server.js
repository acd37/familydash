const express = require('express');
require('dotenv').config();
const passport = require('passport');
const chalk = require('chalk');
const { morganConfig } = require('./config/morganConfig');
const port = process.env.PORT || 5000;
const app = express();
const path = require('path');
const compression = require('compression');

app.use(compression());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Morgan
app.use(morganConfig);

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Routes
require('./routes/user')(app);
require('./routes/auth')(app);
require('./routes/todo')(app);
require('./routes/family')(app);
require('./routes/recipe')(app);
require('./routes/date')(app);

// Models
const db = require('./models');

db.sequelize.sync({ alter: true }).then(() => {
    // server static assets if in production
    // set static folder
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.listen(port, () => console.log(`Server running on port ${chalk.green.bold(port)}!`));
});
