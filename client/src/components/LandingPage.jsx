import React from "react";
import { Link } from "react-router-dom";
import s from "../styles/landingPage.module.css"


export default function LandingPage(){
    return (
        <div>


            <div className={s.container}>  
            </div> 

            <div className={s.contain}>
            <div className={s.text}>
                   <p><strong>WELCOME TO</strong></p>
                <h1>FOOD</h1>
                 <Link to='/home'>
                    <button >Let's cook!</button>
                </Link>   
                </div>         
        </div> 
        </div>
    )
}