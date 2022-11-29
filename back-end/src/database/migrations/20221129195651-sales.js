'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id'},
        allowNull: false,
      },
      seller_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        allowNull: false,
      },
      total_price: {
        type: Sequelize.DECIMAL(9, 2),
      },
      delivery_address: {
        type: Sequelize.STRING(100),
      },
      delivery_number: {
        type: Sequelize.STRING(50),
      },
      sale_date: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING(50)
      }
    }) 
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales')
  }
};
