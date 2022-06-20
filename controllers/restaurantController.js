

const { restarunantService } = require("../services");

// 가게 저장
const createRestaurant = async (req, res) => {
  const {name, category, location, phone, img, openingHours, minPrice} = req.body;
  //const UserId = res.locals.user.id;
  console.log(name, category, location, phone, img, openingHours, minPrice)
  try {
    const createLists= await restarunantService.createList({
       name, category, location, phone, img, openingHours, minPrice});
    console.log(createLists);
   
    res.status(200).json(createLists);
  } catch (error) {
    console.error(error);
  }
}

//가게정보 전체 불러오기 
const restaurantList = async(req, res) => {
  try{
    const restaurantList = await restarunantService.getList()
    
    if (restaurantList) {
      res.status(200).send({
        restaurantList
      })
    }
  }catch(error){
    console.log(error);
        res.status(400).send({
            errorMessage: ' 게시물 조회를 위한 정보가 일치하지 않습니다',
        });
  }
}


//상세정보 보기
const restaurantDetail = async(req, res)=> {
    const restaurantId = req.params.restaurantId
    console.log()
  try{
    const restaurantDetail = await restarunantService.getRestaurant(restaurantId)
    if (restaurantDetail) {
      res.status(200).send({
        restaurantDetail
      })
    }
  }catch(error){
    console.log(error)
    res.status(400).send({errorMessage:'게시물 상세 조회를 위한 정보가 일치하지 않습니다.'})
  }
}


module.exports = {
  createRestaurant,
  restaurantDetail,
  restaurantList
}