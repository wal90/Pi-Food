import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import s from '../styles/detail.module.css'



export default function Detail(props){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
    },[dispatch])

    const myRecipe = useSelector((state) => state.detail)
    console.log(myRecipe)
    return (
        <div className={s.container}>

       
        <div className={s.padre}> 

            {
                !myRecipe ? <p>Loading...</p> :
                <div className={s.containD}>
                <div key={myRecipe.id} >
                    <div className={s.containImage}>
                      <img src={myRecipe.image}/>   
                    </div>

                    <div className={s.details}>
                        <h1>{myRecipe.name}</h1>

                    <div className={s.containText}>
                         <div className={s.detailsOne}>
                            <p>TYPE</p>
                            <h5>{myRecipe.type}</h5>
                            <p>HEALTH SCORE</p>
                            <h5>{myRecipe.healthScore}</h5>
                            <p>DIET</p>
                            <h5>{myRecipe.diet}</h5> 
                            <p>SUMMARY</p> 
                            <h5>{myRecipe.summary}</h5>
                        </div>
                        <div className={s.detailsTwo}>
                            <p>STEPS</p>
                            <h5>{myRecipe.steps}</h5>  
                        </div>
                    </div>

                       
                        
                       
                     
                    </div>
                    
                    


                </div> 
                </div>  
            } 

            <div className={s.btn}>
                <Link to="/home" className={s.link}>
                    <button>Back</button> 
                </Link>

           </div>
            
        </div>
        </div>
    )
}