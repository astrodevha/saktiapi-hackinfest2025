'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Cek apakah tabel sudah ada (mencegah error jika pernah gagal)
    const [tables] = await queryInterface.sequelize.query(
      "SHOW TABLES LIKE 'sectors'"
    );
    if (tables.length > 0) {
      console.log('Table sectors already exists, skipping creation');
      return;
    }

    await queryInterface.createTable('sectors', {
      id: {
        type: Sequelize.CHAR(36),
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        collate: 'utf8mb4_bin'
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      code: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sectors');
  }
};