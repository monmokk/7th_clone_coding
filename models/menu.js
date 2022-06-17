'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    static associate(models) {
      this.belongsTo(models.Restaurant, {
        foreignKey: 'restaurantId',
        targetKey: 'restaurantId'
      })
    }
  }
  Menu.init({
    menuId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    menuName: DataTypes.STRING,
    price: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER,
    explain: DataTypes.STRING,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};