module.exports = function(sequelize, Sequelize) {
    const Family = sequelize.define('family', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        familyCode: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
        },
        familyName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        financeKey: {
            type: Sequelize.STRING
        }
    });

    Family.associate = function(models) {
        Family.hasMany(models.user, {
            onDelete: 'cascade'
        });

        Family.hasMany(models.todo, {
            onDelete: 'cascade'
        });
    };

    return Family;
};
