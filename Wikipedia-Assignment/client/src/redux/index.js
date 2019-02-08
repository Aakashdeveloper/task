/**
  Bootstrap redux
*/
import { createStore, applyMiddleware, compose } from 'redux'
import createRootReducer from './reducers';
import initialState from './config/initial-state';
import middleware,{history} from './config/middleware';
import enhancers from './config/enhancer';
import {routerReducer} from 'react-router-redux';
export {
    history
}


/**
  Combine enhancers and middlewares
*/
const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

/**
 * Configure plugin reducers
 * @type {{routing: undefined}}
 */
const thirdPartyReducers = {
    routing : routerReducer
};

/*
  Create Store
*/
const store = createStore(
  createRootReducer(thirdPartyReducers),
  initialState,
  composedEnhancers
);

//Export Store
export default store
