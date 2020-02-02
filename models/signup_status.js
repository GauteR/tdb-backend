'use strict';
module.exports = (sequelize, DataTypes) => {
  const signup_statuses = sequelize.define('signup_status', {
    name: DataTypes.STRING
  }, {});
  signup_statuses.associate = function(models) {
    // associations can be defined here
  };
  return signup_statuses;
};