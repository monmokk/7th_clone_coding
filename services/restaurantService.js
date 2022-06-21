const {Restaurant} = require("../models")
const {Category} = require("../models")

const createList = async ( name,  categoryId, location, phone, openingHours, minPrice, img) => {
  return await Restaurant.create(
    name, categoryId, location, phone, openingHours, minPrice, img
    ) 

}

const getList = async()=> {
  return await Restaurant.findAll({
    order: [['createdAt', 'DESC']],
    include : [
      {model : Category, attribuetes: ['categoryId']}
    ]
  })
}

const getRestaurant = async() => {
  return await Restaurant.findOne({
    order: [['createdAt', 'DESC']],
    include : [
      {model : Category, attribuetes: ['categoryId']}
    ]
  })
}

module.exports = {
  createList,
  getList,
  getRestaurant,
}