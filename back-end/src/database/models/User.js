'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.STRING,
    }, {
        tableName: 'users',
        timestamps: false,
        underscored: true,
    });

    User.associate = (models) => {
        User.hasMany(models.Sale, {
            foreignKey: 'id', as: 'userId'
          });
        User.hasMany(models.Sale, {
            foreignKey: 'id', as: 'sales'
        })
    }
    return User;
  }
