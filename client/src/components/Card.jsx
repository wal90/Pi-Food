import React from "react";

export default function Card({image, name, diet, healthScore}){
    return (
        <div>
            <div>
                <img src={image} alt="food" width="30%" height="30%"/>
                <h3>{name}</h3>
                <p>{diet.map(e=>e).join(", ")}</p>
                <p>{healthScore}</p>
            </div>

        </div>
    )
}