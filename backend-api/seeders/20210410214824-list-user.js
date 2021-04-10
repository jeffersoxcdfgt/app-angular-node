'use strict';

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
      password: '123456789',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      email: 'jeffersonmedina88@hotmail.com',
      password: '714412547789',
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
