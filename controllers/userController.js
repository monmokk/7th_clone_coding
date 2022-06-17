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
            result: false
        });
    } else {
        res.status(200).send({result: true})
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
                result: false
            });
            return;
        }
        const token = jwt.sign({userId: user.userId}, process.env.SECRET_KEY);

        res.send({
            result: true, token,
        });
    } catch (err) {
        console.log(err)
        res.status(400).send({
            result: false
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
            result: true
        });
    } catch (err) {
        console.error(err);
        res.status(400).send({
            result: false
        });
    }
}

module.exports = {
    login,
    signUp,
    duplicatesCheck
}
