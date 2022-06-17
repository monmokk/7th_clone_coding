'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      this.belongsTo(models.Restaurant, {
        foreignKey: 'restaurantId',
        targetKey: 'restaurantId'
      })
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'userId'
      })
    }
  }
  Review.init({
    reviewId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    review: DataTypes.STRING,
    star: DataTypes.INTEGER,
    phone: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER,
    rootReviewId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};