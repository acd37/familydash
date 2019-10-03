module.exports = function(sequelize, Sequelize) {
  const Date = sequelize.define('date', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    date: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  Date.associate = function(models) {
    Date.belongsTo(models.family, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Date;
};
