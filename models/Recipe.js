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
        cookTime: {
            type: Sequelize.INTEGER
        },
        prepTime: {
            type: Sequelize.INTEGER
        },
        // calorieCount: {
        //   type: Sequelize.INTEGER
        // },
        ingredients: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        instructions: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: ''
        },
        calendar: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
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
