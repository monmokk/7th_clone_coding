const express = require("express");
const authMiddleware = require('../middlewares/auth_middleware');
const {reviewController} = require("../controllers");
const router = express.Router();

router.post("/posts/:restaurantId/review",authMiddleware.checkLogin,reviewController.reviewLists);
router.put("/posts/:restaurantId/review/:reviewId",authMiddleware.checkLogin, reviewController.patchReviews);
router.delete("/posts/:restaurantId/review/:reviewId",authMiddleware.checkLogin, reviewController.deleteReviews)

module.exports = router;
