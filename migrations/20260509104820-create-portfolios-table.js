'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Cek apakah tabel sudah ada
    const tables = await queryInterface.sequelize.query(
      "SHOW TABLES LIKE 'portfolios'",
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    if (tables.length > 0) {
      console.log('Table portfolios already exists, skipping...');
      return;
    }
    
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
    
    // Tambahkan unique constraint setelah table dibuat
    await queryInterface.addConstraint('portfolios', {
      fields: ['name'],
      type: 'unique',
      name: 'unique_portfolios_name'
    });
    
    await queryInterface.addConstraint('portfolios', {
      fields: ['code'],
      type: 'unique',
      name: 'unique_portfolios_code'
    });
    
    // Tambahkan index untuk performa
    await queryInterface.addIndex('portfolios', ['code']);
    await queryInterface.addIndex('portfolios', ['is_active']);
  },

  async down(queryInterface, Sequelize) {
    // Hapus constraints terlebih dahulu
    try {
      await queryInterface.removeConstraint('portfolios', 'unique_portfolios_name');
      await queryInterface.removeConstraint('portfolios', 'unique_portfolios_code');
    } catch (error) {
      console.log('Constraints might not exist');
    }
    
    await queryInterface.dropTable('portfolios');
  }
};