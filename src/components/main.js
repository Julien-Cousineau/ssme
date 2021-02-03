import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import App from './app';



const middleware = applyMiddleware(thunk);
const store = createStore(reducers, middleware);


export default ()=>(
    <Provider store={store}>
      <App/>
    </Provider>
    )