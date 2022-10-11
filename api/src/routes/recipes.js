require('dotenv').config();
const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getAllRecipes } = require('../controllers')
const {  Recipe, Diet} = require('../db.js')

const router = Router();


router.get('/', async (req, res, next)=>{
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
    next(error)
}
      
})

router.get('/:id', async (req, res, next)=>{
    try {
        const {id} =req.params
        const allFood = await getAllRecipes()
        if(id){
            let recipeId = await allFood.filter( (v)=> v.id == id)
            recipeId.length ?
            res.status(200).json(recipeId):
            res.status(404).send('No se encontro la receta')
    
        }
    } catch (error) {
        next(error)
    }
   
})


// router.post('/', async (req, res, next)=>{
//         const { id, name,summary, healthScore, steps, diet, createdInDb} = req.body
//     try {
        
//         if(!name || !summary) res.status(400).json({msg : 'Faltan datos'});

//         const recipeCreate = await Recipe.create({
//              id, name, summary, healthScore , steps, createdInDb });
//         const dietDb = await Diet.findAll({
//             where:{name: diet}
//         })
//         recipeCreate.addDiet(dietDb)
//         res.status(201).send('Creado con éxito')
//       } catch (error) {
//         next(error)
//       }
// })





module.exports = router;