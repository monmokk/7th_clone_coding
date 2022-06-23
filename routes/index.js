const express = require("express");
const router = express.Router();
const userRouter = require("./user_router");
const restaurantRounter = require("./restaurant_router")
const menuRounter = require("./menu_router")
const reviewRouter = require("./review_router")
const categoryRouter = require("./category_router")

router.use("/user", [userRouter]);
router.use("/api", [restaurantRounter],[menuRounter],[reviewRouter],[categoryRouter]);

module.exports = router;