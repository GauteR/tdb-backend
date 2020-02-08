'use strict';
module.exports = (sequelize, DataTypes) => {
  const specializations = sequelize.define('specializations', {
    class: DataTypes.STRING,
    name: DataTypes.STRING,
    raidrole: DataTypes.STRING
  }, {});
  specializations.associate = function(models) {
    specializations.hasOne(models.characters);
  };
  return specializations;
};