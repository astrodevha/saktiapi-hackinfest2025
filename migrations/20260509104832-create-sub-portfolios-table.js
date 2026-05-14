'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const [results] = await queryInterface.sequelize.query(
        "SHOW TABLES LIKE 'sub_portfolios'"
      );
      
      if (results.length > 0) {
        console.log('Table sub_portfolios already exists, skipping creation');
        return;
      }
      
      await queryInterface.createTable('sub_portfolios', {
        id: {
          type: Sequelize.CHAR(36),
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false
        },
        portfolio_id: {
          type: Sequelize.CHAR(36),
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
      
      // Tambahkan foreign key setelah table dibuat
      await queryInterface.addConstraint('sub_portfolios', {
        fields: ['portfolio_id'],
        type: 'foreign key',
        references: {
          table: 'portfolios',
          field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      
      console.log('Table sub_portfolios created successfully');
      
    } catch (error) {
      console.error('Error in sub_portfolios migration:', error.message);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable('sub_portfolios');
      console.log('Table sub_portfolios dropped successfully');
    } catch (error) {
      console.error('Error dropping sub_portfolios:', error.message);
    }
  }
};