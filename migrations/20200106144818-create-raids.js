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
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING
        },
        desc: {
          type: Sequelize.TEXT
        },
        diff: {
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
        minMelee: {
          type: Sequelize.INTEGER
        },
        minRanged: {
          type: Sequelize.INTEGER
        },
        recGear: {
          type: Sequelize.STRING
        },
        announce: {
          allowNull: false,
          type: Sequelize.BOOLEAN
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