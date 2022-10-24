import React from "react";
import { getDiets } from "../actions";
import s from '../styles/card.module.css'

export default function Card({image, name, diet, diets, healthScore}){
    return (
       <div className={s.contain}>
    <div className={s.contain2} >
        <div className={s.containImg}>
            <img src={image} alt="recipe" width="100%" height="100%"/>
        </div> 
         <div className={s.containText}> 
             <h3>{name}</h3>

             <div  className={s.containText2}>
                 <div className={s.di}>
                <p>DIETS</p>
                {/* <h4><strong>{diets ? diets.name : diet }</strong></h4>  */}
                 {diets ? <h4 > {diets.map(d=> d.name) }</h4> : <h4>{diet}</h4>} 
                {/* {diets ? <h4 > {diet.map(d=> d.name) }</h4> : <h4>{diet}</h4>} */}
             </div>
             
             <div className={s.hs}>
                <p>HEALTH SCORE</p> 
               <h4>{healthScore}</h4> 
             </div>

             </div>
           
             
         </div> 
    </div>
   
</div>
    )
}

