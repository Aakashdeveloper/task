export default function(state={}, action){
    switch(action.type){
        case 'GET_BOOKING':
            return{...state, bookinglist:action.payload.data.getAllReservationHotels.result}
        default:
            return state
    }
}
