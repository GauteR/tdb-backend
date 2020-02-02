'use strict';
module.exports = (sequelize, DataTypes) => {
  const status = sequelize.define('status', {
    name: DataTypes.STRING
  }, {});
  status.associate = function(models) {
    status.hasOne(models.raid_signup);
  };
  return status;
};