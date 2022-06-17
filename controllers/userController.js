const Joi = require("joi");
const {userService} = require("../services");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require('dotenv').config();

const postUsersSchema = Joi.object({
    email: Joi.string().email().required(),
    nickname: Joi.string().required(),
    password: Joi.string().required(),//disallow(Joi.ref('nickname')).
    confirmPassword: Joi.equal(Joi.ref('password'))
});

const postAuthSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const duplicatesCheck = async (req, res) => {
    let {email, nickname} = req.params;

    if (typeof email === "undefined") {
        email = null
    } else if (typeof nickname === "undefined") {
        nickname = null
    }

    const existUser = await userService.checkDuplicates(email, nickname)
    if (existUser.length) {
        res.status(400).send({
            errorMessage: "이미 가입된 이메일 또는 닉네임이 있습니다.",
        });
    } else {
        res.status(200).send({message: "사용 가능합니다"})
    }

};
const login = async (req, res) => {
    try {
        const {email, password} = await postAuthSchema.validateAsync(req.body);
        console.log(email)
        const user = await userService.loginUser(email);
        console.log(user)
        const authenticate = await bcrypt.compare(password, user.password);
        if (!user || !authenticate) {
            res.status(400).send({
                errorMessage: "이메일 또는 패스워드가 잘못됐습니다.",
            });
            return;
        }
        const token = jwt.sign({userId: user.userId}, process.env.SECRET_KEY);

        res.send({
            token,
        });
    } catch (err) {
        console.log(err)
        res.status(400).send({
            errorMessage: "이메일 또는 패스워드가 잘못됐습니다.",
        });
    }

}
const signUp = async (req, res) => {
    try {
        const {email, nickname, password, confirmPassword} = await postUsersSchema.validateAsync(req.body);
        const salt = await bcrypt.genSalt();
        const hashedPwd = await bcrypt.hash(password, salt);
        const createdUser = await userService.createUser({
            email,
            nickname,
            password: hashedPwd,
        });
        res.status(200).send({
            result: createdUser,
        });
    } catch (err) {
        console.error(err);
        res.status(400).send({
            message: `${err} : 회원가입 실패`,
        });
    }
}

module.exports = {
    login,
    signUp,
    duplicatesCheck
}
