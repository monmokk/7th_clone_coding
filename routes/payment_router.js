const express = require("express");
const { checkLogin } = require('../middlewares/auth_middleware');
const { paymentController } = require("../controllers");

const router = express.Router();
const unirest = require('unirest')
const {response} = require("express");

const iamUrl = 'https://api.iamport.kr'
let tokenId;

router.post('/complete', checkLogin, paymentController.paymentRequest)

router.post('/admin/get-iamport-token', (req, res) => {
    unirest.post(`${iamUrl}/users/getToken`)
        .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
        .send({'imp_key': process.env.IAM_PORT_KEY, 'imp_secret': process.env.IAM_PORT_SECRET})
        .end(response => {
            tokenId = response.body.access_token;
            res.status(200).send({
                result: true, token: response.body
            })
        })
})

router.post('/admin/get-payments/:merchantUid', (req, res) => {
    const merchantUid = req.params;
    unirest.get(`${iamUrl}/payments/find/${merchantUid}/?sorting=-paid`)
        .headers({'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': tokenId})
        .end(response => {
            res.status(200).send({
                result: true, data: response.body

            })
        })
})

module.exports = router;