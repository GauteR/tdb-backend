'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_roles = sequelize.define('user_roles', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    roleId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  user_roles.associate = function(models) {
    user_roles.hasMany(models.users);
    user_roles.hasMany(models.roles);
  };
  return user_roles;
};