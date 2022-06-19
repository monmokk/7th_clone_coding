const express = require("express");
const router = express.Router();
const userRouter = require("./user_router");
const payRouter = require('./payment_router')

router.use("/user", [userRouter]);
router.use("/payment", [payRouter]);

module.exports = router;