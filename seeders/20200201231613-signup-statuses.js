'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('signup_status', [{
      name: 'Signed up',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Approved',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Backup',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Unavailable',
      createdAt: new Date(),
      updatedAt: new Date()
    }],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('signup_status');
  }
};
