const {categoryService} = require("../services")
const categories = async (req, res) => {

  try {
    const {category} = req.body;
    
    const categoryLists = await categoryService.createCategory({category});
    console.log(  categoryLists );
   
    res.status(200).json( categoryLists);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  categories
}