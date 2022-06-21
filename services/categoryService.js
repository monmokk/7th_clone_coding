
const {Category} = require("../models")

const createCategory = async ( category) => {
  return await Category.create( category)
}

module.exports = {
  createCategory
}