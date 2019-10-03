module.exports = function(app) {
  const db = require('../models');
  const passport = require('passport');
  const ynab = require('ynab');
  const accessToken = process.env.YNAB_TOKEN;
  const ynabAPI = new ynab.API(accessToken);

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
  app.get('/api/finance/categories', (req, res) => {
    const budgetResponse = ynabAPI.categories
      .getCategories(process.env.YNAB_BUDGET_ID)
      .then((response) => {
        const categories = response.data.category_groups;

        res.json(categories);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
