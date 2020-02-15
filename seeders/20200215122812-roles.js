'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [{
      name: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'raid_leader',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'raid_assist',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'officer',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'raider',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'member',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'guest',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles');
  }
};
