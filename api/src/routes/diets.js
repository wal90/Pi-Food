require('dotenv').config();
const { Router } = require('express');
const { getAllDiets } = require('../controllers/index.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const axios = require('axios')
const { Diet } = require('../db.js')
const { API_KEY  } = process.env;

const router = Router();

router.get('/', async (req, res )=>{
    try {
      const getDiets = await getAllDiets() 
      res.json(getDiets)
    } catch (error) {
      res.status(400).send({error: "Diet not found" })
    }
})






module.exports = router;