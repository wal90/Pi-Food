import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";



export default function Detail(props){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
    },[dispatch])

    const myRecipe = useSelector((state) => state.detail)
    console.log(myRecipe)
    return (
        <div>


            {
                !myRecipe ? <p>Loading...</p> :
                <div>
                <div key={myRecipe.id} >
                    <img src={myRecipe.image} width="300px" hight="300px"/> 
                    <h1>{myRecipe.name}</h1>
                    <h5>Type: {myRecipe.type}</h5>
                    <h5>Health Score: {myRecipe.healthScore}</h5>
                    <h5>Diet: {myRecipe.diet}</h5> 
                    <p>Summary: {myRecipe.summary}</p>
                     <p>Steps: {myRecipe.steps}</p> 


                </div> 
                </div>  
            } 
            <Link to="/home">
               <button>Back</button> 
            </Link>
              
        </div>
    )
}