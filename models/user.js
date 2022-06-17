'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Review, {
        foreignKey: 'userId',
        targetKey: 'userId'
      })
      this.hasMany(models.Order, {
        foreignKey: 'userId',
        targetKey: 'userId'
      })
    }
  }
  User.init({
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: DataTypes.STRING,
    pwd: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    typeId: DataTypes.INTEGER, // 0: 고객, 1: 사장님
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};