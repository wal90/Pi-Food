import React from "react";
import s from '../styles/card.module.css'

export default function Card({image, name,  diets, healthScore}){


    return (
       <div className={s.contain}>
    <div className={s.contain2} >
        <div className={s.containImg}>
            <img src={image ||  "https://heartstrokeprod.azureedge.net/-/media/images/articles/foodguideplatev2.ashx?r"} alt="recipe" width="100%" height="100%"/>
        </div> 
         <div className={s.containText}> 
             <h3>{name}</h3>

             <div  className={s.containText2}>
                 <div className={s.di}>
                <p>DIETS</p>
              
              {diets.map(d=> <strong><p className={s.diet}>{d.name + ' · '}</p></strong> )}
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

