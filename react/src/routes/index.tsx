import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginScreen from './login-screen'
import ConferenceScreen from './conference-screen'

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/call">
          <ConferenceScreen/>
        </Route>
        <Route path="/">
          <LoginScreen/>
        </Route>
      </Switch>
    </Router>
  )
}

export default AppRoutes