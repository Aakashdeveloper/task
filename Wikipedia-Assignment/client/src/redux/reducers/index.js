import {combineReducers} from 'redux'
import cities from './cities';

/**
 * Combine all the reducers
 * @param thirdPartyReducers
 * @returns {Reducer<S>}
 */
const createRootReducer = function(thirdPartyReducers){
    return combineReducers({
        ...thirdPartyReducers,
        cities
    })
}
export default createRootReducer
