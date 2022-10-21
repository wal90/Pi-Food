import axios from "axios";

export function getRecipes(){
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001/recipes")
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}

export function getNameRecipes(name){
    return async function (dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            return dispatch({
                type: 'GET_NAME_RECIPES',
                payload: json.data
            })
        } catch (error) {
            throw error
        }
    }
}

export function getDiets(){
    return async function (dispatch){
        var info = await axios.get('http://localhost:3001/diets', {});
        return dispatch({
            type: 'GET_DIETS',
            payload: info.data
        })
    }
}

export function postRecipe(payload){
    return async function (dispatch){
        var response = await axios.post('http://localhost:3001/recipe', payload);
        return response;
    }
}

export function filterRecipeByDiet(payload){
    return {
        type: 'FILTER_BY_DIET',
        payload
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByHs(payload){
    return{
        type: 'ORDER_BY_HS',
        payload
    }
}

export function getDetail(id){
    return async function (dispatch){
        try {
           var jsonId = await axios.get("http://localhost:3001/recipes/" + id);
           return dispatch({
            type: 'GET_DETAILS',
            payload: jsonId.data
           })
        } catch (error) {
            throw error
        }
    }
}

export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
}