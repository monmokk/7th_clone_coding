const {restarunantService, menuService} = require("../services");

// 가게 저장
const createRestaurant = async (req, res) => {
    try {
        const { name,  location, phone, logoImg, openingHours, minPrice, category } = req.body[0];
        const { categoryId } = await restarunantService.getRestaurantId(category);
        const createLists = await restarunantService.createList({
            name, categoryId, location, phone, logoImg, openingHours, minPrice
        });
        let createMenu;
        for (let i = 1; i < req.body.length; i++) {
            let {menuName, price, explain, menuImg} = req.body[i];
            createMenu = await menuService.createMenu({
                menuName,
                price,
                explain,
                menuImg,
                restaurantId: createLists.restaurantId
            });
        }
        res.status(200).json(createMenu);
    } catch (e) {
        console.log(e)
    }
}

//가게정보 전체 불러오기 
const restaurantList = async (req, res) => {
    try {
        const restaurantList = await restarunantService.getList()

        if (restaurantList) {
            res.status(200).send({
                restaurantList
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({
            errorMessage: ' 게시물 조회를 위한 정보가 일치하지 않습니다',
        });
    }
}


//상세정보 보기
const restaurantDetail = async (req, res) => {
    const restaurantId = req.params.restaurantId
    console.log()
    try {
        const restaurantDetail = await restarunantService.getRestaurant(restaurantId)
        if (restaurantDetail) {
            res.status(200).send({
                restaurantDetail
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({errorMessage: '게시물 상세 조회를 위한 정보가 일치하지 않습니다.'})
    }
}


module.exports = {
    createRestaurant,
    restaurantDetail,
    restaurantList
}