import React from "react";
import s from "../styles/paginated.module.css"

export default function Paginated({recipePerPage, allRecipes, paginated}){
    const pageNumbers = []

    for(let i=0; i<= Math.floor(allRecipes/recipePerPage); i++){
        pageNumbers.push(i + 1)
    }

    return (
        <div className={s.pagination}>
             <nav>
            <ul>
                { pageNumbers &&
                  pageNumbers.map(number =>(
                    <li className={s.pa} key={number.toString()}>
                    <a onClick={()=> paginated(number)}>{number}</a>
                    </li>
                  ))

                }
            </ul>
        </nav>  
        </div>
     
    )

}