const { reviewService } = require("../services");

//리뷰저장
const reviewLists = async (req, res) => {
  const userId = res.locals.user.userId
  console.log(userId)
  try {
    const { review, star } = req.body;
    const {restaurantId} = req.params;

    const reviewLists = await reviewService.createReview({ 
       review, star, restaurantId, userId });
    res.status(200).json(reviewLists);
  } catch (error) {
    console.error(error);
  }
}

const getReviewList = async (req, res) => {
  const { restaurantId } = req.params;
  const reviewLists = await reviewService.getReviewList(restaurantId)
  console.log(reviewLists)
  return res.status(200).json(reviewLists)
}

//리뷰 수정
const patchReviews = async(req, res) => {
  const reviewId = req.params.reviewId
  const userId = res.locals.user.userId;
  const existReview = await reviewService.findReview(reviewId)
  // console.log(existReview,userId)
  if (existReview.userId!== userId) {
   
    return res.status(401).json({ message: '작성자만 수정할 수 있습니다.' });
  }

  try {
    const {review, star} = req.body;
    const patchReviews = await reviewService.patchReview(review, star, reviewId)
    console.log(patchReviews)
    res.status(200).send({patchReviews});
    
  } catch (error) {
    console.error(error);
  }
}

//리뷰 삭제
const deleteReviews = async(req, res) => {
  const reviewId = req.params.reviewId
  const userId = res.locals.user.userId;
  const existReview = await reviewService.findReview(reviewId)
  // console.log(existReview,userId)
  if (existReview.userId!== userId) {
   
    return res.status(401).json({ message: '작성자만 삭제할 수 있습니다.' });
  }
  try {
    const reviewId = req.params.reviewId
    const deleteReviews = await reviewService.deleteReview(reviewId)
    console.log(patchReviews)
    res.status(200).send({deleteReviews, message: '삭제완료' });
    
  } catch (error) {
    console.error(error);
  }

}


module.exports = {
  reviewLists,
  patchReviews,
  deleteReviews,
  getReviewList
}