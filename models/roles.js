'use strict';
module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  roles.associate = function(models) {
    roles.belongsTo(models.user_roles);
  };
  return roles;
};