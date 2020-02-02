'use strict';
module.exports = (sequelize, DataTypes) => {
  const characters = sequelize.define('characters', {
    raceId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    realm: {
      type: DataTypes.STRING
    },
    armoryLink: DataTypes.STRING,
    isMain: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
  }, {});
  characters.associate = function(models) {
    characters.belongsTo(models.users);
    characters.hasMany(models.raid_signup);
    characters.hasOne(models.specializations);
    characters.hasOne(models.races);
  };
  return characters;
};