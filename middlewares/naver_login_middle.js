const passport = require('passport');
const NaverStrategy = require('passport-naver-v2').Strategy;

const {User} = require("../models");
const bcrypt = require("bcrypt");
const {Strategy: KakaoStrategy} = require("passport-kakao");

module.exports = () => {
    passport.use(
        new NaverStrategy(
            {
                clientID: process.env.NAVER_ID,
                clientSecret: process.env.NAVER_SECRET,
                callbackURL: 'http://localhost:4000/user/naver/callback',
            },
            async (_, __, profile, done) => {
                try {
                    const salt = await bcrypt.genSalt();
                    const hashedPwd = await bcrypt.hash(profile.id, salt);
                    let user = await User.findOne({where: { email: profile.email }});

                    if (!user) {
                        user = await User.create({
                            email: profile.email,
                            nickname: profile.name,
                            password: hashedPwd
                        });
                    }
                    done(null, user);
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            },
        ),
    );
};