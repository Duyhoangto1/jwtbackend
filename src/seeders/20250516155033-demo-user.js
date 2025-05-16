'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('User', [
      {
        username: 'admin',
        email: 'admin@gmail.com',
        password: '123123',
      },
       {
        username: 'admin1',
        email: 'admin1@gmail.com',
        password: '123123',
      },
       {
        username: 'admin2',
        email: 'admin2@gmail.com',
        password: '123123',
      },


], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
