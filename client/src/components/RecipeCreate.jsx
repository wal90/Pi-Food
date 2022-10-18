import React,{useState, useEffect} from "react";
import { Link, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../actions";


function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = 'Name is required';
    } else if (!/\S+@\S+\.\S+/.test(input.name)) {
      errors.name = 'Name is invalid';
    }
    if (!input.summary) {
      errors.summary = 'Summary is required';
    } 
    if(!input.healthScore){
        errors.healthScore = 'Health Score is required'
    } else if(input.healthScore < 100){
        errors.healthScore = 'Health Score is invalid';
    }
    if(!input.image.includes("https://") ){
        errors.image= 'Image is invalid'
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
        <div>
            <Link to="/home"><button>Back</button></Link> 
            <h1>Create your recipe</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Name: </label>
                    <input
                    type="text"
                    value={input.name} 
                    name="name"
                    onChange={(e)=>handleChange(e)}/>
                    {errors.name &&(
                        <p>{errors.name}</p>
                    )}
                </div>

                <div>
                    <label>Sumary: </label>
                    <input
                    type="text"
                    value={input.summary}
                    name="summary"
                    onChange={(e)=>handleChange(e)} />
                     {errors.summary &&(
                        <p>{errors.summary}</p>
                    )}
                </div>

                
                <div>
                    <label>Health Score: </label>
                    <input
                    type="text"
                    value={input.healthScore}
                    name="healthScore"
                    onChange={(e)=>handleChange(e)} />
                     {errors.healthScore &&(
                        <p>{errors.healthScore}</p>
                    )}
                </div>

                 
                <div>
                    <label>Image: </label>
                    <input
                    type="text"
                    value={input.image}
                    name="image"
                    onChange={(e)=>handleChange(e)} />
                     {errors.image &&(
                        <p>{errors.image}</p>
                    )}
                </div>

                <div>
                    <label>Steps: </label>
                    <input
                    type="text"
                    value={input.steps}
                    name="steps"
                    onChange={(e)=>handleChange(e)} />
                     {errors.steps &&(
                        <p>{errors.steps}</p>
                    )}
                </div>


                <div>
                    <label>Select Diet </label>
                    <select onChange ={(e)=>handleSelect(e)}>
                        {diets.map((d) => (
                         <option key={d.name} value={d.name}>{d.name}</option>
                         ))} 
                     </select>
                     
                     {input.diet.map(el =>
                        <div>
                            <p>{el}</p> <button onClick={()=>handleDelete(el)}>x</button> 
                        </div>  
                      )}
                </div>
                <div>
                    <button type="submit">Create Recipe</button>
                </div>


            
            </form>
        </div>
    )
}