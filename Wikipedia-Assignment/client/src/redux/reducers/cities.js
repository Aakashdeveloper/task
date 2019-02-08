/**
  Cities Reducer
*/
import {
    GET_CITIES
} from '../actions';
import InitialState from '../config/initial-state'

export default function(state = InitialState.cities, action) {
    let payload = action.payload

    switch (action.type) {
        case GET_CITIES:
          if(!action.error){
              return payload.data;
          } else {
              return InitialState.cities
          }
          break;
    }
    return state;
}
