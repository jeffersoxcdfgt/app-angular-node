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
     return queryInterface.bulkInsert('products', [
      {
       name: 'product 1',
       description:'This is the first product',
       price:'100.00',
       picture:'https://imagesdomain/picture1.jpg',
       cost:'80.00',
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
        name: 'product 2',
        description:'This is the second product',
        price:'100.00',
        picture:'https://imagesdomain/picture2.jpg',
        cost:'80.00',
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
  }
};
