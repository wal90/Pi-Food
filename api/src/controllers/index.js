require("dotenv").config();
const { Router } = require("express");
const {Op} = require("sequelize")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios")
const { Recipe, Diet} = require("../db")
const { API_KEY  } = process.env;

const router = Router();


 const getApiInfo= async () =>{
    // const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=26f5694668424436baf7cfbd6ca4948e&addRecipeInformation=true&number=100`);
    // console.log(apiUrl.data.results)
    const apiToDb = await apiUrl.data.results.map( r =>{
                return{
                    // id: idCreator(),
                    id: r.id,
                    name: r.title,
                    type:r.dishTypes,
                    summary: r.summary.replace(/(<([^>]+)>)/gi, ""),
                    healthScore: r.healthScore,
                    steps: r.analyzedInstructions.map(a=> a.steps.map(s=>s.step).join(' - ')),
                    image: r.image,
                    diet: r.diets
                }}
            )
        
        return apiToDb
    
 }

//  const getApiInfo= async () =>{
//     const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=26f5694668424436baf7cfbd6ca4948e&addRecipeInformation=true&number=100`);
//     // console.log(apiUrl.data.results)
//     const apiToDb = await Recipe.findAll()
//         !apiToDb.length && 
//             await Recipe.bulkCreate(apiUrl.data.results.map( r =>{
//                 return{
//                     // id: idCreator(),
//                     // id: r.id,
//                     name: r.title,
//                     summary: r.summary,
//                     healthScore: r.healthScore,
//                     steps: r.analyzedInstructions.map(a=> a.steps.map(s=>s.step).join(' - ')),
//                     image: r.image 
//                 }}
//             ))
        
//         return apiToDb
    
//  }


//  const getDbInfo = async ()=>{
//     return await Recipe.findAll({
//         include:{
//             model:  Diet,
//             attributes: ['diets'],
//             through:{
//                 atributes:[]
//             }
//         }
//     }) 
// }

const getDbInfo = async () =>{    //aca voy traer lo que guardo en la base de datos(date base)
    return await Recipe.findAll({
        include :{
            model: Diet,
            attributes:["name"],
            through:{
                attributes: [],
            }
        }
    })
}
// const getDbInfo = async (name) => {
//     return await Recipe.findAll({
//         where: {
//             name : {
//                 [Op.iLike]: "%" + name +"%"
//             }
//         },
//         attributes: ["name"],
//         include: [
//             {
//                 model: Diet,
//                 attributes: ["name"],
//                 through: {
//                     attributes: []
//                 }
//             }
//         ]       
//     });
// };

const getAllRecipes = async () =>{
    const apiInfo = await getApiInfo()
    const dbInfo = await getDbInfo()
    const infoTotal = apiInfo.concat(dbInfo)
    return infoTotal
}


const getAllDiets = async () =>{
    // const dietsApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
 const dietsApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=26f5694668424436baf7cfbd6ca4948e&addRecipeInformation=true&number=100`)
      
    const dataDiets = dietsApi.data.results.map(e => e.diets).join().split(',').filter(d => d !== "")

    const allDiets = dataDiets.filter((element, index)=>{ 
        return dataDiets.indexOf(element) === index;
    })

    allDiets.push("vegetarian")  
    
    allDiets.forEach(e=> {
            Diet.findOrCreate({
                where:{
                    name: e
                }
            })
            
           });
            return await Diet.findAll()


}


// const getAllEpisodes = async() =>{
//     const apiUrle= await  axios.get(`https://rickandmortyapi.com/api/episode`);
//     const apiInfo = await apiUrle.data.results.map(e => {
//         return{
//             name: e.name,
//            }
//     })
//    apiInfo.forEach(e=> {
//     Episode.findOrCreate({
//         where:{
//             name: e.name
//         }
//     })
    
//    });
//     return await Episode.findAll()
// }



            // dataDiets.forEach(e => {
            //     Diet.findOrCreate({
            //       where: { name: e },
            //       defaults: { id: idCreator(true), name : e }
            // })
            
            // const typeDB = await Diet.findAll()
            

// }

// router.post("/", async (req, res, next) => {
//     const { name, dificulty, season, countries } = req.body
//     try {     //1 posicion, true || false
//         const [actCreated, boolCreate] = await Activity.findOrCreate({
//             // distractorin const obj{name:nestor, age:32}   const {name, age } = obj ||      const arr ["nestor", true]
//             //                                                                           const [primero, bulean] = arr
//             where: {
//                 name: name //si existe una actividad con el nombre especificado
//             },
//             defaults: { id: idCreator(true), name, dificulty: parseInt(dificulty) , season } //create

//         })
//         console.log(actCreated.dataValues.id)
//         if (!actCreated) throw "No se pudo crear la actividad"
//         else {
//             countries.map(async (e) => {
//                 const countFind = await Country.findOne({
//                     where: { name: e }
//                 })
//                 countFind.addActivity(actCreated.dataValues.id)
//             })
//             boolCreate ? res.send("Actividad creada y asociada.") : res.send("Actividad asociada")
//         }
//     } catch (error) { 
//         next(error)}
// })

module.exports = {
    getApiInfo,
    getDbInfo,
    getAllRecipes,
    getAllDiets
      
}