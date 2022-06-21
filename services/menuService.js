const {Menu} = require("../models")

const createMenu = async (restaurantId, menuName, price, explain ) => {
    
  return await Menu.create(restaurantId, menuName, price, explain)
}

 module.exports = {
  createMenu
}