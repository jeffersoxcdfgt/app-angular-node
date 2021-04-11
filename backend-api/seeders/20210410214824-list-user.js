'use strict';

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('users', [
     {
      email: 'test@test.com',
      password: bcrypt.hashSync('123456789', bcrypt.genSaltSync(8)),
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      email: 'jeffersonmedina88@hotmail.com',
      password: bcrypt.hashSync('94541178', bcrypt.genSaltSync(8)),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
    }
  }
};
