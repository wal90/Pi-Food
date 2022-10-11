require('dotenv').config();
const { Router } = require('express');
const { getAllDiets } = require('../controllers/index.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const axios = require('axios')
const { Diet } = require('../db.js')
const { API_KEY  } = process.env;

const router = Router();

router.get('/', async (req, res, next)=>{
    try {
      const getDiets = await getAllDiets() 
      res.json(getDiets)
    } catch (error) {
        next(error)
    }
})






module.exports = router;