import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import Loading from "./Loading"
import s from '../styles/detail.module.css'



export default function Detail(props){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
    },[dispatch])

    const myRecipe = useSelector((state) => state.detail)
    console.log(myRecipe)

    // var diets = "";
	// if (myRecipe.diets !== undefined){
	// 	diets = myRecipe.diets.map((e) => {
	// 	 	 return  e.name;
	// 	})
	// }else{
	// 	diets = myRecipe.diets
	// }


    return (
        <div className={s.container}>


        <div className={s.padre}>

            {

                myRecipe ? 
                <div className={s.containD}>
                <div key={myRecipe.id} >
                    <div className={s.containImage}>
                      <img src={ myRecipe.image || "https://heartstrokeprod.azureedge.net/-/media/images/articles/foodguideplatev2.ashx?rev=372b23652cd243f98bef2cca920a6fd4&bc=f7f7f7&w=1160&h=653&as=1&la=en&hash=32388F46CEA12E28FA9E7F05FE09110A"} alt="image loading..."/>
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
                            {/* {myRecipe.diets && myRecipe.diets.map(el => <h5>{el.name}</h5>)} */}

                            {/* <h5>{myRecipe.diets}</h5>  */}
                        {!myRecipe.createdInDb?  <h5>{myRecipe.diets}</h5> : myRecipe.diets.map(d =><h5> {d.name} </h5>) }
                            {/* {myRecipe.createInDb? myRecipe.diets.map(d =><h5> {d.name} </h5>) : <h5>{myRecipe.diets}</h5> } */}
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
                : <Loading></Loading> 
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