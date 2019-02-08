export default function(state={}, action){
    switch(action.type){
        case 'GET_NEXT':
            return action.payload
        default:
            return state
    }
}