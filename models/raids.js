/*jshint esversion: 8 */

(function () {
  'use strict';
  module.exports = (sequelize, DataTypes) => {
    const raids = sequelize.define('raids', {
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      desc: DataTypes.TEXT,
      diff: DataTypes.STRING,
      planned: DataTypes.DATE,
      minTanks: DataTypes.INTEGER,
      minHealers: DataTypes.INTEGER,
      minDamage: DataTypes.INTEGER,
      recGear: DataTypes.STRING,
      announce: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      }
    }, {});
    raids.associate = function (models) {
      raids.belongsTo(models.users);
    };
    return raids;
  };
}());