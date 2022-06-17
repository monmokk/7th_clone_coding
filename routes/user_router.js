const express = require("express");
const authMiddleware = require('../middlewares/auth_middleware');
const { userController } = require("../controllers");
const passport = require('passport');

const router = express.Router();

router.post("/login", authMiddleware.checkAlreadyLogin, userController.login);
router.post("/signup", authMiddleware.checkAlreadyLogin, userController.signUp);
router.get("/check/email/:email", userController.duplicatesCheck);
router.get("/check/nickname/:nickname", userController.duplicatesCheck);

router.get('/kakao', passport.authenticate('kakao', {session: false}));
router.get('/kakao/callback',passport.authenticate('kakao',{session: false}), userController.loginKakao)

module.exports = router;