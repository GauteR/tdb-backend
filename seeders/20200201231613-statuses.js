'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('statuses', [{
      name: 'Unavailable',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Raid leader',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Raid assist',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Available',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Backup',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Drafted',
      createdAt: new Date(),
      updatedAt: new Date()
    }],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('statuses');
  }
};
