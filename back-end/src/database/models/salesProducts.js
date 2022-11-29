'use strict';

module.exports = (sequelize, DataTypes) => {
    const saleProduct = sequelize.define('saleProduct', {
        saleId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
    }, {
        tableName: 'salesProducts',
        timestamps: false,
        underscored: true,
    });

    saleProduct.associate = (models) => {
        models.Sale.belongsToMany(models.Product, {
        as: 'products',
        through: saleProduct,
        foreignKey: 'saleId',
        otherKey: 'productId'
        });

    saleProduct.associate = (models) => {
        models.Product.belongsToMany(models.Sale, {
        as: 'sale',
        through: saleProduct,
        foreignKey: 'productId',
        otherKey: 'saleId'
        });
    }
}

return saleProduct;
}
