import React from "react";
import { Link } from "react-router-dom";


export default function LandingPage(){
    return (
        <div>
            <p><strong>BIENVENIDOS A MI PÁGINA DE</strong></p>
            <h1>FOOD</h1>
            <Link to='/home'>
            <button>INGRESAR</button>
            </Link>
            
        </div>
    )
}