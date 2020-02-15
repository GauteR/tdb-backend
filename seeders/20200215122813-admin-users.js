/*jshint esversion: 8 */
const Auth = require("../helpers/authenticationHelper");

(function () {
  'use strict';
  module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.query(
        'SELECT `id` FROM `roles` WHERE `name` = ? ', {
        replacements: ['admin'],
        type: queryInterface.sequelize.QueryTypes.SELECT
      })
      .then(res => {
        return queryInterface.bulkInsert('users', [{
          username: 'admin',
          password: Auth.Encrypt(process.env.ADMIN_PASSWORD),
          email: 'rnngau@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date()
        }], {}).then(uId => {
          queryInterface.bulkInsert('user_roles', [{
            userId: uId,
            roleId: res[0].id,
            createdAt: new Date(),
            updatedAt: new Date()
          }], {});
        });
      });
    },

    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users');
    }
  };
}());
