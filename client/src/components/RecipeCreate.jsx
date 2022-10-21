import React,{useState, useEffect} from "react";
import { Link, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../actions";
import s from '../styles/create.module.css'


function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = 'Name is required';
    }  else if (!/^[A-Za-z]+$/i.test(input.name)) {
        errors.name = 'Name is invalid';
      }
    if (!input.summary) {
      errors.summary = 'Summary is required';
    } 
    if(!input.healthScore){
        errors.healthScore = 'Health Score is required';
    } else if(!/^(?:(?:^|,)([0-9]|[1-9]\d|10[00])(?!.*,\1(?:,|$)))+$/.test(input.healthScore)){
        errors.healthScore = 'Health Score is invalid';
    }
    if(!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(input.image) ){
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
    const diets = useSelector((state)=> state.diet)
    const [errors, setErrors] = useState({})
    

    const [input, setInput] = useState({
        name:"",
        summary:"",
        healthScore:0,
        image:"",
        steps:[],
        diet:[]
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
            diet:[...input.diet, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postRecipe(input))
        alert("Recipe created")
        setInput({
            name:"",
            summary:"",
            healthScore:0,
            image:"",
            steps:[],
            diet:[]
        })
        history.push("/home")

    }

    function handleDelete(el){
        setInput({
            ...input,
            diet: input.diet.filter(d => d !== el)
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
                    type="text"
                    value={input.healthScore}
                    name="healthScore"
                    onChange={(e)=>handleChange(e)} />
                     {errors.healthScore &&(
                        <p className={s.error}>{errors.healthScore}</p>
                    )}
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
                     
                     {input.diet.map(el =>
                        <div className={s.diet}>
                            <p>{el}</p> <button onClick={()=>handleDelete(el)}>x</button> 
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