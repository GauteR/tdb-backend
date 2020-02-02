'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('races', [{
      name: 'Dark Iron Dwarf',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Draenei',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Dwarf',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Gnome',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Human',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Kul Tiran',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Lightforged Draenei',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Mechagnome',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Night Elf',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Pandaren',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Void Elf',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Worgen',
      createdAt: new Date(),
      updatedAt: new Date()
    }],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('races');
  }
};
