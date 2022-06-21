const express = require("express");
const {restaurantController} = require("../controllers");
const router = express.Router();

router.post("/posts", restaurantController.createRestaurant);
router.get("/post", restaurantController.restaurantList)
router.get("/post/:restaurantId", restaurantController.restaurantDetail)

module.exports = router;