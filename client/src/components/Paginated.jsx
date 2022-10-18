import React from "react";

export default function Paginated({recipePerPage, allRecipes, paginated}){
    const pageNumbers = []

    for(let i=0; i<= Math.ceil(allRecipes/recipePerPage); i++){
        pageNumbers.push(i + 1)
    }

    return (
        <nav>
            <ul>
                { pageNumbers &&
                  pageNumbers.map(number =>(
                    <li key={number}>
                    <a onClick={()=> paginated(number)}>{number}</a>
                    </li>
                  ))

                }
            </ul>
        </nav>
    )

}