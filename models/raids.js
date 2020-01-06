/*jshint esversion: 8 */

(function () {
  'use strict';
  module.exports = (sequelize, DataTypes) => {
    const raids = sequelize.define('raids', {
      name: DataTypes.STRING,
      planned: DataTypes.DATE,
      minTanks: DataTypes.INTEGER,
      minHealers: DataTypes.INTEGER,
      minDamage: DataTypes.INTEGER,
      recGear: DataTypes.STRING
    }, {});
    raids.associate = function (models) {
      raids.hasMany(models.users);
    };
    return raids;
  };
}());