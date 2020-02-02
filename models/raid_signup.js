'use strict';
module.exports = (sequelize, DataTypes) => {
  const raid_signup = sequelize.define('raid_signup', {
    characterId: DataTypes.INTEGER,
    raidId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER
  }, {});
  raid_signup.associate = function(models) {
    raid_signup.belongsTo(models.raids);
    raid_signup.belongsTo(models.characters);
    raid_signup.belongsTo(models.status);
  };
  return raid_signup;
};