'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('portfolios', {
        id: {
          type: Sequelize.CHAR(36),
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING(255),
          allowNull: false
        },
        code: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        is_active: {
          type: Sequelize.BOOLEAN,
          defaultValue: true
        },
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        },
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        }
      });
    } catch (error) {
      console.error('Error in portfolios migration:', error.message);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable('portfolios');
    } catch (error) {
      console.error('Error dropping portfolios:', error.message);
    }
  }
};