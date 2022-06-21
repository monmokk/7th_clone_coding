const express = require("express");
const { checkAlreadyLogin } = require('../middlewares/auth_middleware');
const { userController } = require("../controllers");
const passport = require('passport');

const router = express.Router();

router.post("/login", checkAlreadyLogin, userController.login);
router.post("/signup", checkAlreadyLogin, userController.signUp);
router.get("/check/email/:email", userController.duplicatesCheck);
router.get("/check/nickname/:nickname", userController.duplicatesCheck);

router.get('/kakao', passport.authenticate('kakao', {session: false}));
router.get('/kakao/callback',passport.authenticate('kakao',{session: false, failureRedirect: '/'}), userController.loginSNS)

router.get('/naver', passport.authenticate('naver', {session: false, authType: 'reprompt'}));
router.get('/naver/callback', passport.authenticate('naver', {session: false, failureRedirect: '/' }), userController.loginSNS);

module.exports = router;