const {menuService} = require("../services")


const menuLists = async (req, res) => {
  //const UserId = res.locals.user.id;
  try {
    const { menuName, price, explain } = req.body;
    const {restaurantId} = req.params;
    console.log( menuName, price, restaurantId, explain )
    const menuLists= await menuService.createMenu({ restaurantId, menuName, price, explain });
    console.log( menuLists);
   
    res.status(200).json(menuLists);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  menuLists
}