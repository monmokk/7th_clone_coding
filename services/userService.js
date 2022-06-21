const { Op } = require("sequelize");

const { User } = require("../models");

const checkDuplicates = async (email, nickname) => {
    return await User.findAll({
        where: {
            [Op.or]: [{ email }, { nickname }],
        },
    })
}
const createUser = async (user) => {
    return await User.create(user);
}

const loginUser = async (email) => {
    console.log(email)
    return await User.findOne({
        where: {
            email
        },
    })
}

const updateUser = async  ( userId, phone, address, postAddress ) => {
    return User.update( { phone, address, postAddress }, { where: { userId } } )
}

module.exports = {
    checkDuplicates,
    createUser,
    loginUser,
    updateUser
}
