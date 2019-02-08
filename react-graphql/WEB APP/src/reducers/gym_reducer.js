export default function(state={}, action){
    switch(action.type){
        case 'GET_GYMLIST':
            return{...state, gym:action.payload.data.getAllHotels.result}
        default:
            return state
    }
}

