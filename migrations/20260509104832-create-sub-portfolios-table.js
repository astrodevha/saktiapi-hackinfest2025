'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Cek apakah tabel sudah ada
    const tables = await queryInterface.sequelize.query(
      "SHOW TABLES LIKE 'sub_portfolios'",
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    if (tables.length > 0) {
      console.log('Table sub_portfolios already exists, skipping...');
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
        allowNull: false,
        references: {
          model: 'portfolios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
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
        defaultValue: true,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
    
    // Tambahkan unique constraint
    await queryInterface.addConstraint('sub_portfolios', {
      fields: ['portfolio_id', 'code'],
      type: 'unique',
      name: 'unique_sub_portfolios_portfolio_code'
    });
    
    await queryInterface.addIndex('sub_portfolios', ['portfolio_id']);
    await queryInterface.addIndex('sub_portfolios', ['code']);
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.removeConstraint('sub_portfolios', 'unique_sub_portfolios_portfolio_code');
    } catch (error) {
      console.log('Constraint might not exist');
    }
    await queryInterface.dropTable('sub_portfolios');
  }
};