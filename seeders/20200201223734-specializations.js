'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('specializations', [{
      class: "Death Knight",
      name: "Blood",
      raidrole: "Tank",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Death Knight",
      name: "Frost",
      raidrole: "Melee",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Death Knight",
      name: "Unholy",
      raidrole: "Melee",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Demon Hunter",
      name: "Havoc",
      raidrole: "Melee",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Demon Hunter",
      name: "Vengeance",
      raidrole: "Tank",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Druid",
      name: "Restoration",
      raidrole: "Healer",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Druid",
      name: "Guardian",
      raidrole: "Tank",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Druid",
      name: "Feral",
      raidrole: "Melee",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Druid",
      name: "Balance",
      raidrole: "Ranged",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Hunter",
      name: "Beast Mastery",
      raidrole: "Ranged",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Hunter",
      name: "Marksmanship",
      raidrole: "Ranged",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Hunter",
      name: "Survival",
      raidrole: "Melee",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Mage",
      name: "Arcane",
      raidrole: "Ranged",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Mage",
      name: "Fire",
      raidrole: "Ranged",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Mage",
      name: "Frost",
      raidrole: "Ranged",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Monk",
      name: "Brewmaster",
      raidrole: "Tank",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Monk",
      name: "Mistweaver",
      raidrole: "Healer",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Monk",
      name: "Windwalker",
      raidrole: "Melee",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Paladin",
      name: "Holy",
      raidrole: "Healer",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Paladin",
      name: "Protection",
      raidrole: "Tank",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Paladin",
      name: "Retribution",
      raidrole: "Melee",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Priest",
      name: "Discipline",
      raidrole: "Healer",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Priest",
      name: "Holy",
      raidrole: "Healer",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Priest",
      name: "Shadow",
      raidrole: "Ranged",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Rogue",
      name: "Assassination",
      raidrole: "Melee",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Rogue",
      name: "Outlaw",
      raidrole: "Melee",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Rogue",
      name: "Sublety",
      raidrole: "Melee",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Shaman",
      name: "Elemental",
      raidrole: "Ranged",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Shaman",
      name: "Enhancement",
      raidrole: "Melee",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Shaman",
      name: "Restoration",
      raidrole: "Healer",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Warlock",
      name: "Affliction",
      raidrole: "Ranged",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Warlock",
      name: "Demonology",
      raidrole: "Ranged",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Warlock",
      name: "Destruction",
      raidrole: "Ranged",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Warrior",
      name: "Arms",
      raidrole: "Melee",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Warrior",
      name: "Fury",
      raidrole: "Melee",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      class: "Warrior",
      name: "Protection",
      raidrole: "Tank",
      createdAt: new Date(),
      updatedAt: new Date()
    }],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('specializations');
  }
};
