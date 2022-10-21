import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../actions";
import s from "../styles/searchBar.module.css"



export default function SearchBar(){

    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameRecipes(name))
    
    }


    return (
        <div>
            <div className={s.in}>
                <input
                 type="text" 
                 placeholder="search recipe"
                 onChange={(e)=>handleInputChange(e)}
                 />  
                <button type="submit"
                onClick={(e)=>handleSubmit(e)}>
                Search
                </button>
            </div>
       
        </div>
    )
}