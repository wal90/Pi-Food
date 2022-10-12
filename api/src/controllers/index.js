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

    try {

    
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

    // const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=26f5694668424436baf7cfbd6ca4948e&addRecipeInformation=true&number=100`);

    // console.log(apiUrl.data.results)
    const apiToDb = await apiUrl.data.results.map( r =>{
                return{
                    
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
    
 }   catch (error) {
         return ({error: "Recipe not found" })
    }



 }













const getDbInfo = async () =>{  
    try {
      return await Recipe.findAll({
        include :{
            model: Diet,
            attributes:["name"],
            through:{
                attributes: [],
            }
        }
    })  
    } catch (error) {
        return ({error: "Recipe not found in database" })
    }
    
}




const getAllRecipes = async () =>{
    try {
        const apiInfo = await getApiInfo()
        const dbInfo = await getDbInfo()
        const infoTotal = apiInfo.concat(dbInfo)
        return infoTotal 
    } catch (error) {
        return ({error: "Recipe not found " })
    } 
   
}

    

const getById = async (id) =>{

    try {
        const idApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
    const d = idApi.data
    return{
                    
        id: d.id,
        name: d.title,
        type:d.dishTypes,
        summary: d.summary.replace(/(<([^>]+)>)/gi, ""),
        healthScore: d.healthScore,
        steps: d.analyzedInstructions.map(a=> a.steps.map(s=>s.step).join(' - ')),
        image: d.image,
        diet: d.diets
    } 
    } catch (error) {
        return ({error: "Id not found " })
    }
  
}



const getDbById = async (id) => {

    try {
          return await Recipe.findByPk(id, {
        include: [
            {
                model: Diet,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        ]
    });  
    } catch (error) {
        return ({error: "Id not found " })
    }
};





const getAllDiets = async () =>{

    try {
       const dietsApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);


   //  const dietsApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=26f5694668424436baf7cfbd6ca4948e&addRecipeInformation=true&number=100`);


 //const dietsApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=26f5694668424436baf7cfbd6ca4948e&addRecipeInformation=true&number=100`)
      
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
  
    } catch (error) {
        return ({error: "Diet not found " })
    }

   

}




module.exports = {
    getApiInfo,
    getDbInfo,
    getAllRecipes,
    getAllDiets,
    getById,
    getDbById,

    
    
    


      
}