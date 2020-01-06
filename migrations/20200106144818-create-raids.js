/*jshint esversion: 8 */

(function () {
  'use strict';
  module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('raids', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        },
        planned: {
          type: Sequelize.DATE
        },
        minTanks: {
          type: Sequelize.INTEGER
        },
        minHealers: {
          type: Sequelize.INTEGER
        },
        minDamage: {
          type: Sequelize.INTEGER
        },
        recGear: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('raids');
    }
  };
}());