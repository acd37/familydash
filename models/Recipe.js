module.exports = function(sequelize, Sequelize) {
  const Recipe = sequelize.define('recipe', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      defaultValue: 'No description given.'
    },
    ingredients: {
      type: Sequelize.STRING,
      allowNull: false
    },
    cookTime: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    image: {
      type: Sequelize.STRING
    },
    calorieCount: {
      type: Sequelize.INTEGER
    }
  });

  Recipe.associate = function(models) {
    Recipe.belongsTo(models.family, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Recipe;
};
