const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const { User } = require("../models");
const bcrypt = require("bcrypt");

module.exports = () => {
    passport.use('kakao',
        new KakaoStrategy(
            {
                clientID: process.env.KAKAO_ID,
                callbackURL: 'http://localhost:4000/user/kakao/callback',
            },
            async (_, __, profile, done) => {
                const email = profile._json.kakao_account.email
                const nickname = profile.username
                const password = profile.id+''

                const salt = await bcrypt.genSalt();
                const hashedPwd = await bcrypt.hash(password, salt);

                let user = await User.findOne({ where: {email} })

                if (!user) {
                    user = await User.create({ email, nickname, password:hashedPwd })
                }


                return done(null, user)
            }
        )
    )
}
