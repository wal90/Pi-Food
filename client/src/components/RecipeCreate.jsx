import React,{useState, useEffect} from "react";
import { Link, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../actions";
import s from '../styles/create.module.css'


function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = 'Name is required';
    } 
    if (!input.type){
        errors.type = 'Type is required'
    }
    if (!input.summary) {
      errors.summary = 'Summary is required';
    } 
    if(!input.healthScore){
        errors.healthScore = 'Health Score is required';
    } 
     if (!input.image.includes('https://')){
        errors.image= 'Image is invalid'
    }
    if(!input.steps){
        errors.steps= 'Steps is required'
    }
    
    
   
    return errors;
  }


export default function RecipeCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const diets = useSelector((state)=> state.diets)
    const [errors, setErrors] = useState({})
    

    const [input, setInput] = useState({
        name:"",
        type:"",
        summary:"",
        healthScore:0,
        image:"",
        steps:[],
        diets:[]
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleSelect(e){
        setInput({
            ...input,
            diets:[...input.diets, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postRecipe(input))
        alert("Recipe created")
        console.log(input)
        setInput({
            name:"",
            type:"",
            summary:"",
            healthScore:0,
            image:"",
            steps:[],
            diets:[]
        })


    }

    function handleDelete(el){
        setInput({
            ...input,
            diets: input.diets.filter(d => d !== el)
        })
    }

    useEffect(()=>{
        dispatch(getDiets())
    }, []);


    return (
        <div >
            <div className={s.container}>

            </div>

       
        <div className={s.contain}>
            <div className={s.all}>

                <div className={s.btn}>
                    <Link to="/home" className={s.link}><button>Back</button></Link>   
                </div>
              
          
            

            <div className={s.containR}>
            <h1>Create your recipe</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className={s.sInput}>
                    <label>Name: </label>
                    <input
                    type="text"
                    value={input.name} 
                    name="name"
                    onChange={(e)=>handleChange(e)}/>
                    {errors.name &&(
                        <p className={s.error}>{errors.name}</p>
                    )}
                </div>

                <div className={s.sInput}>
                    <label>Type: </label>
                    <input
                    type="text"
                    value={input.type} 
                    name="type"
                    onChange={(e)=>handleChange(e)}/>
                    {errors.type &&(
                        <p className={s.error}>{errors.type}</p>
                    )}
                </div>    

                <div className={s.sInput}>
                    <label>Sumary: </label>
                    <input
                    type="text"
                    value={input.summary}
                    name="summary"
                    onChange={(e)=>handleChange(e)} />
                     {errors.summary &&(
                        <p className={s.error}>{errors.summary}</p>
                    )}
                </div>

                
                <div className={s.sInput}>
                    <label>Health Score: </label>
                    <input
                    type="range"
                    min="0" 
                    max="100" 
                    value={input.healthScore}
                    name="healthScore"
                    onChange={(e)=>handleChange(e)} />
                     {errors.healthScore ?(
                        <p className={s.error}>{errors.healthScore}</p> 
                      ) :  <p className={s.data}>{input.healthScore}</p>}
                </div>

                 
                <div className={s.sInput}>
                    <label>Image: </label>
                    <input
                    type="text"
                    value={input.image}
                    name="image"
                    onChange={(e)=>handleChange(e)} />
                     {errors.image &&(
                        <p className={s.error}>{errors.image}</p>
                    )}
                </div>

                <div className={s.sInput} >
                    <label>Steps: </label>
                    <input
                    type="text"
                    value={input.steps}
                    name="steps"
                    onChange={(e)=>handleChange(e)} />
                     {errors.steps &&(
                        <p className={s.error}>{errors.steps}</p>
                    )}
                </div>


                <div className={s.sInput}>
                    <label>Select Diet </label>
                    <select onChange ={(e)=>handleSelect(e)}>
                     
                        {diets.map((d) => (
                         <option key={d.name} value={d.name}>{d.name}</option>
                         ))} 
                     </select>
                     
                     {input.diets.map(el =>
                        <div className={s.diet}>
                            <p>{el}</p> <button type="button" onClick={()=>handleDelete(el)}>x</button> 
                        </div>  
                      )}
                </div>
                <div className={s.create}>
                    <button type="submit">Create Recipe</button>
                </div>


            
            </form>
            </div>
            </div>
        </div>
        </div>
    )
}