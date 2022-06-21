const {Restaurant} = require("../models")
const {Category} = require("../models")
const {Menu} = require("../models")

const createList = async ( restaurant ) => {
    return await Restaurant.create(restaurant)
}

const getList = async () => {
    return await Restaurant.findAll({
        order: [['createdAt', 'DESC']],
        include: [
            {model: Category, attribuetes: ['categoryId']}
        ]
    })
}

const getRestaurant = async (restaurantId) => {
    return await Restaurant.findByPk(restaurantId, {
        include: [
            { model: Menu }
        ]
    })
}

module.exports = {
    createList,
    getList,
    getRestaurant
}