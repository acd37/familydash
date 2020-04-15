module.exports = function(sequelize, Sequelize) {
    const Todo = sequelize.define('todo', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isCompleted: {
            type: Sequelize.BOOLEAN
        },
        assignedUser: {
            type: Sequelize.STRING
        }
    });

    Todo.associate = function(models) {
        Todo.belongsTo(models.family, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Todo;
};
