import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import App from './container/App';
import Header from './component/header';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore)

const MainApp = () => {
    return(
        <div>
            <Header/>
            <App/>
        </div>
        
    )
}

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <MainApp />
    </Provider>, document.getElementById('root'));
