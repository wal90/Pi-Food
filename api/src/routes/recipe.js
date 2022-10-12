require('dotenv').config();
const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const axios = require('axios')
const { Diet, Recipe } = require('../db.js')
const { API_KEY  } = process.env;

const router = Router();

router.post('/', async (req, res )=>{
   
    try {
        const { name,summary, healthScore, steps, diet, createdInDb} = req.body
        if(!name || !summary) res.status(400).json({msg : 'Faltan datos'});

        const recipeCreate = await Recipe.create({
             name, summary, healthScore , steps, createdInDb });
        const dietDb = await Diet.findAll({
            where:{name: diet}
        })
        recipeCreate.addDiet(dietDb)
        res.status(201).send('Creado con éxito')
      } catch (error) {
        res.status(400).send({error: "error" })
      }
})






module.exports = router;