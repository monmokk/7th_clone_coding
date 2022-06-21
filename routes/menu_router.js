const express = require("express");
const {menuController} = require("../controllers");
const router = express.Router();

router.post("/posts/:restaurantId/menu", menuController.menuLists);


module.exports = router;