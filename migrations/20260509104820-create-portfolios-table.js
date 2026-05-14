'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Cek apakah tabel sudah ada
      const [results] = await queryInterface.sequelize.query(
        "SHOW TABLES LIKE 'portfolios'"
      );
      
      if (results.length > 0) {
        console.log('Table portfolios already exists, skipping creation');
        return;
      }
      
      // Buat tabel tanpa constraint kompleks dulu
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
      
      console.log('Table portfolios created successfully');
      
    } catch (error) {
      console.error('Error in portfolios migration:', error.message);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable('portfolios');
      console.log('Table portfolios dropped successfully');
    } catch (error) {
      console.error('Error dropping portfolios:', error.message);
    }
  }
};