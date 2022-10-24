require('dotenv').config();
const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const axios = require('axios')
const { Diet, Recipe } = require('../db.js')
const { API_KEY  } = process.env;

const router = Router();

router.post('/', async (req, res , netx)=>{
    const {  name,summary, type,  healthScore, steps, diet, createdInDb} = req.body
    if(!name || !summary) res.status(400).json({msg : 'Faltan datos'});
    try {
        const recipeCreate = await Recipe.create({
             name, summary, type, healthScore , steps, createdInDb });

       
        const dietDb = await Diet.findAll({
            where:{name: diet}
        })

        console.log(Diet.__proto__)
        recipeCreate.addDiet(dietDb)
        res.status(201).json('Creado con éxito')
      } catch (error) {
        // res.status(400).send({error: "error" })
        netx(error)
      }
})






module.exports = router;