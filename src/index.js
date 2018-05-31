import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import reducers from './reducer.js'
import './config'
import './index.css'

import App from './App';

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f))

// function Boss() {
//     return <h2>boss</h2>
// }


// Boss Genius Me Msg 4个页面共享
ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
         <App />

        </BrowserRouter>
    </Provider>

    , document.getElementById('root'));
