'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('portfolios', [
      { 
        id: uuidv4(), 
        name: 'Digital Transformation', 
        code: 'DIGITAL',
        created_at: new Date(), 
        updated_at: new Date() 
      },
      { 
        id: uuidv4(), 
        name: 'Cybersecurity', 
        code: 'CYBER',
        created_at: new Date(), 
        updated_at: new Date() 
      },
      { 
        id: uuidv4(), 
        name: 'Infrastructure', 
        code: 'INFRA',
        created_at: new Date(), 
        updated_at: new Date() 
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('portfolios', null, {});
  }
};