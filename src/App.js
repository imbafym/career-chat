import React, { Component } from 'react';

import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authRoute/authRoute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusInfo/geniusInfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
import { Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
        <AuthRoute></AuthRoute>

        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/bossinfo' component={BossInfo}></Route>
          <Route path='/geniusinfo' component={GeniusInfo}></Route>
          <Route path='/chat/:user' component={Chat}></Route>
          <Route component={Dashboard}></Route>
        </Switch>
      </div>
    )
  }
}

export default App;
