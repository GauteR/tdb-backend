/*jshint esversion: 8 */

const Auth = require("../helpers/authenticationHelper");

(function () {
  'use strict';
  module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          try {
            this.setDataValue('password', Auth.Encrypt(value.toString()));
          } catch(ex) {
            console.error(ex);
            this.setDataValue('password', this.getDataValue('password'));
          }
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING
      }
    }, {});
    users.associate = function (models) {
      users.hasMany(models.raids);
    };
    return users;
  };
}());