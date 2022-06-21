const {Menu} = require("../models")

const createMenu = async (menu) => {
    return await Menu.create(menu)
}

module.exports = {
    createMenu
}