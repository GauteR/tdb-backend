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
      planned: {
        allowNull: false,
        type: DataTypes.DATE,
        set(value) {
          var d = new Date(value);
          this.setDataValue('planned', d.toUTCString());
        }
      },
      minTanks: DataTypes.INTEGER,
      minHealers: DataTypes.INTEGER,
      minMelee: DataTypes.INTEGER,
      minRanged: DataTypes.INTEGER,
      recGear: DataTypes.STRING,
      announce: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      }
    }, {});
    raids.associate = function (models) {
      raids.belongsTo(models.users);
      raids.hasMany(models.raid_signup);
    };
    return raids;
  };
}());