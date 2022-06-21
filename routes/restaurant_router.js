const express = require("express");
const {restaurantController} = require("../controllers");
const authMiddleware = require('../middlewares/auth_middleware');
const router = express.Router();

router.post("/posts",authMiddleware.checkLogin, restaurantController.createRestaurant);
router.get("/post", restaurantController.restaurantList)
router.get("/post/:restaurantId", restaurantController.restaurantDetail)

module.exports = router;