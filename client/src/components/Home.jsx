import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux"
import SearchBar from "./SearchBar";
import { getRecipes, filterRecipeByDiet, orderByName, orderByHs, filterCreated } from "../actions";
import Card from "./Card";
import Paginated from "./Paginated";
import s from "../styles/home.module.css"


export default function Home(){


    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.recipes)
    const [order, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [recipePerPage, setRecipePerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipePerPage;
    const indexOfFirtsRecipe = indexOfLastRecipe - recipePerPage;
    const currentRecipes = allRecipes.slice(indexOfFirtsRecipe,indexOfLastRecipe);

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect (()=>{
        dispatch(getRecipes())
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes())
    }

    function handleFilterDiet(e){
        dispatch(filterRecipeByDiet(e.target.value))
    }

    
    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`ordenado ${e.target.value}`)
    }

    function handleSortHs(e){
        e.preventDefault();
        dispatch(orderByHs(e.target.value))
        setCurrentPage(1);
        setOrden(`ordenado ${e.target.value}`)
    }

    function handleFilterCreate(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
       
    }


    




    return (
        <div>
        <div className={s.containerHome}>
            <div className={s.nav}>
            <h1>FOOD</h1>
            <Link to='/create' className={s.link}> CREATE RECIPE </Link>
            <SearchBar/>
            <button onClick={e => {handleClick(e)}}>Reload</button>

            <div>
            <div className={s.sel}>
               <select onChange={e=>handleSort(e)}>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>  
            </div>
           

            <select onChange={e => handleFilterDiet(e)}>
                <option value="all">All Diets</option>
                <option value="vegan">Vegan</option>
                <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
                <option value="paleolithic">Paleolithic</option>
                <option value="dairy free">Dairy free</option>
                <option value="gluten free">Gluten free</option>
                <option value="whole 30">Whole 30</option>
                <option value="primal">Primal</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="ketogenic">Ketogenic</option>
                <option value="fodmap friendly">Fodmap friendly</option>
                <option value="vegetarian">Vegetarian</option>
            </select>

             <select onChange={e=>handleFilterCreate(e)}>
                    <option value="All">All</option>
                    <option value="Actual">Actual</option>
                    <option value="Created">Created</option>
            </select>

            <select onChange={e => handleSortHs(e)}>
                <option value="des">Descending order</option>
                <option value="asc">Ascending order</option>   
            </select>
            </div>
            </div>
            <div className={s.pag}>
            <Paginated
                recipePerPage={recipePerPage}
                allRecipes={allRecipes.length}
                paginated={paginated}
            />

           </div>

        <div className={s.allCards}>
       
         
            {
                 currentRecipes?.map((c)=> {
                    return(
                        <Fragment>
                            <Link to={"/recipes/" + c.id}>
                            <Card image={c.image} name={c.name} diet={c.diet} healthScore={c.healthScore} key={c.id} />
                            </Link>
                        </Fragment>
                    )
                    
                })
            }
        </div>

        
              
        </div>
        </div>
    )
}