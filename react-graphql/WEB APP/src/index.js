import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

// Components
import App from './components/App';

// Reducer
import reducers from './reducers';

const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleWare(reducers)}>
        <App />
    </Provider>, document.getElementById('root'));

