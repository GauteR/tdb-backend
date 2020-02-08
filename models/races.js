'use strict';
module.exports = (sequelize, DataTypes) => {
  const races = sequelize.define('races', {
    name: DataTypes.STRING
  }, {});
  races.associate = function(models) {
    races.hasOne(models.characters);
  };
  return races;
};