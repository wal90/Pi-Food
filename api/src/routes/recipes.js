require('dotenv').config();
const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getAllRecipes, getDbById, getById } = require('../controllers')
const { API_KEY  } = process.env;

const router = Router();


router.get('/', async (req, res, next) => {
try {
    const name = req.query.name
    let allRecipes= await getAllRecipes()
    if(name){
        let foodName= await  allRecipes.filter(v=> v.name.toLowerCase().includes(name.toLocaleLowerCase()))
        foodName.length ?
        res.status(200).json(foodName) :
        res.status(404).send('Receta no encontrada');
    } else{
        res.status(200).send(allRecipes)
    }

} catch (error) {
    res.status(400).send({error: "Recipe not found" })
}
      
})



router.get("/:id",async(req,res) => {
    
  try {
    const { id } = req.params
    const regex = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/;
    if (regex.test(id)) {
      const fromDB = await getDbById(id)
      return res.json(fromDB)
      
    } else  {
      const fromAPI = await getById(id)
      console.log(fromAPI)
      return res.json(fromAPI)
    } 
  }
  catch (error) {
    res.status(400).send({error: "Id not found" })
  }

})




module.exports = router;