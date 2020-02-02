'use strict';
module.exports = (sequelize, DataTypes) => {
  const characters = sequelize.define('characters', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    raceId: {
      allowNull: false,
      type: DataTypes.INTEGER
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
  };
  return characters;
};