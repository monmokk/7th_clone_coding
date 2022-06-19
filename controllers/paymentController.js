const { paymentService } = require("../services");

const paymentComplete = async (req, res) => {
    try{
        const {imp_uid, merchant_id} = req.body;
        const {userId} = res.locals.user;
        const createdOrder = await paymentService.createOrder({

        })

    }catch (e) {
        res.status(400).send(e)
    }
}
module.exports = {
    paymentComplete
}
