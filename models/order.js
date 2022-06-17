'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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