import { combineReducers } from 'redux';
import gymList from './Booking_reducer';
import addnew from './gym_reducer'

const rootReducer = combineReducers({
    gymList,
    addnew
})

export default rootReducer;