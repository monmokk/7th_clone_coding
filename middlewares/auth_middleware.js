const jwt = require('jsonwebtoken');
const { User } = require("../models");
require('dotenv').config;

const checkLogin = (req, res, next) => {
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(' ');

    if (tokenType !== 'Bearer') {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요!',
        });
        return;
    }

    try {
        const { userId } = jwt.verify(tokenValue, process.env.SECRET_KEY);
        User.findByPk(userId).then((user) => {
            res.locals.user = user;
            next();
        });
    } catch (error) {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요!',
        });
    }
};

const checkAlreadyLogin = (req, res, next) => {
    const { authorization } = req.headers;
    if(typeof authorization === 'string'){
        const [tokenType] = authorization.split(' ');
        if (tokenType === 'Bearer') {
            res.status(401).send({
                errorMessage: '이미 로그인되어 있습니다',
            });
        } else {
            next()
        }
    } else {
        next()
    }

}

module.exports = {
    checkLogin,
    checkAlreadyLogin
}