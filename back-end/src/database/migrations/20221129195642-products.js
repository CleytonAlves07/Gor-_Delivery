'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('products', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(4, 2)
    },
    url_image: {
      type: Sequelize.STRING(200),
      allowNull: false,
    }
   })
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('products')
  }
};
