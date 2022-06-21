
const {Review} = require("../models")

const createReview = async ( review, star, restaurantId, userId) => {
  return await Review.create( review, star, restaurantId, userId)
}

const findReview = async(reviewId) => {
  return await Review.findOne({
    where: { 
      reviewId 
    }
  })
}


const patchReview = async(review, star, reviewId) => {
  await Review.update(

    { review , star },
    
    { where: { reviewId } },);

   return await Review.findByPk(reviewId) //
}

const deleteReview = async(reviewId) => {
  await Review.destroy({where : {reviewId}})

  return await Review.findByPk(reviewId)
}


module.exports = {
  createReview,
  findReview,
  patchReview,
  deleteReview
}