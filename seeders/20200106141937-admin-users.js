/*jshint esversion: 8 */
const Auth = require("../helpers/authenticationHelper");

(function () {
  'use strict';
  module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [{
        username: 'admin',
        password: Auth.Encrypt(process.env.ADMIN_PASSWORD),
        email: 'rnngau@gmail.com',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }],{});
    },

    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users');
    }
  };
}());
