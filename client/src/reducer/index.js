const initialState ={
    recipes: [],
    detail:[],
    allRecipes:[],
    diet:[],
    
}

function rootReducer(state = initialState, action){
    switch (action.type) {
        case 'GET_RECIPES':
            return{
                ...state,
                recipes: action.payload,
                allRecipes:action.payload
            }

        case 'GET_NAME_RECIPES':
            return{
                ...state,
                recipes: action.payload
            }
        case 'FILTER_BY_DIET':
            const allRecipes = state.allRecipes
            const dietFiltered = action.payload === "All" ? allRecipes : allRecipes.filter(e => e.diet?.includes(action.payload))
            if(dietFiltered.length === 0){
                alert("The diet doesn't belong to any recipe")
            }
            return{
                ...state,
                recipes: dietFiltered
            }
        
        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'A-Z'  ?
                state.recipes.sort(function(a,b){
                    if(a.name > b.name){
                        return 1
                    }
                    if(b.name > a.name){
                         return -1
                    }
                        return 0
                    }) :
                state.recipes.sort(function(a,b){
                    if(a.name > b.name){
                      return -1
                    }
                    if(b.name > a.name){
                        return 1
                        }
                        return 0
                    })
            return {
                ...state,
                recipes: sortedArr
                    }

        case 'ORDER_BY_HS':
            let sortArr = action.payload === 'des'  ?
                state.recipes.sort(function(a,b){
                    if(a.healthScore > b.healthScore){
                        return 1
                    }
                    if(b.healthScore > a.healthScore){
                        return -1
                    }
                        return 0
                    }) :
                state.recipes.sort(function(a,b){
                    if(a.healthScore > b.healthScore){
                        return -1
                    }
                    if(b.healthScore > a.healthScore){
                        return 1
                    }
                        return 0
                    })
            return {
                ...state,
                recipes: sortArr
                    }
            
        case 'POST_RECIPE':
            return{
                ...state,
            } 
            
        case 'GET_DIETS':
            return{
                ...state,
                diet:action.payload
            }
    
        case 'GET_DETAILS':
            return{
               ...state,
               detail:action.payload
            }

        case 'FILTER_CREATED':
            const allRecipe = state.allRecipes
            const createdFilter = action.payload === "Created" ? allRecipe.filter(el=> el.createdInDb) : allRecipes.filter(el=>!el.createInDb)
            return{
                ...state,
                recipes: action.payload === "All" ? state.allRecipes : createdFilter
            }
    
        default:
            return state
    }
}


export default rootReducer;