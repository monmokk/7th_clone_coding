'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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