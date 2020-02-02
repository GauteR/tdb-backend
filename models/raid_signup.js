'use strict';
module.exports = (sequelize, DataTypes) => {
  const raid_signup = sequelize.define('raid_signup', {
    characterId: DataTypes.INTEGER,
    raidId: DataTypes.INTEGER,
    signup_statusId: DataTypes.INTEGER
  }, {});
  raid_signup.associate = function(models) {
    raid_signup.hasOne(models.signup_status);
  };
  return raid_signup;
};