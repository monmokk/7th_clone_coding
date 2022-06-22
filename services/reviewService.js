const {Review} = require("../models")
const {User} = require("../models")

const createReview = async (review) => {
    const created = await Review.create(review)
    return await Review.findAll({
        where: {restaurantId: created.restaurantId},
        include: {
            model: User,
            attributes: ['nickname']
        }
    })


}

const findReview = async (reviewId) => {
    return await Review.findOne({
        where: {
            reviewId
        }
    })
}


const patchReview = async (review, star, reviewId) => {
    await Review.update(
        {review, star},
        {where: {reviewId}});

    return await Review.findByPk(reviewId, {
        include: {
            model: User,
            attributes: ['nickname']
        }
    }) //
}

const deleteReview = async (reviewId) => {
    await Review.destroy({where: {reviewId}})

    return await Review.findByPk(reviewId)
}

const getReviewList = async (restaurantId) => {
    return await Review.findAll({
        where: {restaurantId},
        include: {
            model: User,
            attributes: ['nickname']
        }
    })
}


module.exports = {
    createReview,
    findReview,
    patchReview,
    deleteReview,
    getReviewList
}