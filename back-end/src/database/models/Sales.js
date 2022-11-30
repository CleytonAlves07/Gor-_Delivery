'use strict';

module.exports = (sequelize, DataTypes) => {
    const Sale = sequelize.define('Sale', {
        id: {
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        userId: DataTypes.STRING,
        sellerId: DataTypes.STRING,
        totalPrice: DataTypes.DECIMAL(9,2),
        deliveryAddress: DataTypes.STRING(100),
        deliveryNumber: DataTypes.STRING(50),
        saleDate: DataTypes.DATE,
        status: DataTypes.STRING(50),
    }, {
        tableName: 'sales',
        timestamps: false,
        underscored: true,
    });

    Sale.associate = (models) => {
        Sale.belongsTo(models.User, {
            foreignKey: 'user_id', as: 'user'
        });
        Sale.belongsTo(models.User, {
            foreignKey: 'sellerId', as: 'seller_id'
        })
    }
    return Sale;
  }
