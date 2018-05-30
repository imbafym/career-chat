import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'

import reducers from './reducer.js'
import './config'
import './index.css'

import App from './App';
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authRoute/authRoute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusInfo/geniusInfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f))

// function Boss() {
//     return <h2>boss</h2>
// }


// Boss Genius Me Msg 4个页面共享
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/geniusinfo' component={GeniusInfo}></Route>
                    <Route path='/chat/:user' component={Chat}></Route>
                    
                    {/* <Route path='/boss' component={Boss}></Route> */}
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>

        </BrowserRouter>
    </Provider>

    , document.getElementById('root'));
