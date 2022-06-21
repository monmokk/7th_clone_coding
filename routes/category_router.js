const express = require("express");
const {categoryController} = require("../controllers");
const router = express.Router();

router.post("/category", categoryController.categories);


module.exports = router;