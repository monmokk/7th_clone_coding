const {Restaurant} = require("../models")
const {Category} = require("../models")
const{Menu} = require("../models")

const createList = async ( name,  categoryId, location, phone, openingHours, minPrice, menuName, price, explain, menuImg, logoImg) => {
    let restaurant =  await Restaurant.create({name, categoryId, location, phone, openingHours, minPrice, logoImg},
         
            
    // let menu =  await Menu.create( menuName, price, explain, menuImg )   
   
   // return  restaurant
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