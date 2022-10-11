const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const dietsRoute = require('./diets.js');
const recipesRoute = require('./recipes.js')
const recipeRoute = require('./recipe.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/diets', dietsRoute);
router.use('/recipes', recipesRoute);
router.use('/recipe', recipeRoute);


module.exports = router;
