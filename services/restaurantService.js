const {Restaurant} = require("../models")
const {Category} = require("../models")

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

const getRestaurant = async () => {
    return await Restaurant.findOne({
        order: [['createdAt', 'DESC']],
        include: [
            {model: Category, attribuetes: ['categoryId']}
        ]
    })
}

module.exports = {
    createList,
    getList,
    getRestaurant,
}