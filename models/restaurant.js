'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    static associate(models) {
      this.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        targetKey: 'categoryId'
      })
      this.hasMany(models.Menu, {
        foreignKey: 'restaurantId',
        targetKey: 'restaurantId'
      })
      this.hasMany(models.Order, {
        foreignKey: 'restaurantId',
        targetKey: 'restaurantId'
      })
    }
  }
  Restaurant.init({
    restaurantId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },    
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    location: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    img: DataTypes.STRING,
    openingHours: DataTypes.STRING,
    minPrice: DataTypes.INTEGER,
    star: DataTypes.INTEGER,
    review: DataTypes.INTEGER,
    ownerReview: DataTypes.INTEGER,
    like: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};