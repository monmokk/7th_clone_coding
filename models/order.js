'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'userId'
      })
      this.belongsTo(models.Restaurant, {
        foreignKey: 'restaurantId',
        targetKey: 'restaurantId'
      })
    }
  }
  Order.init({
    orderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    menuList: DataTypes.STRING,
    menuCount: DataTypes.INTEGER,
    paymentId: DataTypes.INTEGER,
    payment: DataTypes.STRING,
    orderRequests: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};