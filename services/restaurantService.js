const {Restaurant} = require("../models")
const {Category} = require("../models")

const createList = async ( name, category, location, phone, openingHours, minPrice, img) => {
  return await Restaurant.create(
    name,category, location, phone, openingHours, minPrice, img
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

module.exports = {
  createList,
  getList
}