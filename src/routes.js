import React from 'react'
import { Route, Router, IndexRoute, Redirect } from 'react-router'

import Dashboard from './app/components/Dashboard'
import Home from './app/components/Home'
import UsersScreen from './app/users/UsersScreen'
import UserForm from './app/users/UserForm'

const routes = () => {
  return (
    <Route path="/" component={Dashboard}>
      <IndexRoute component={Home} />

      <Router>
        <Route path="users" component={UsersScreen}/>
        <Route path="users/add" component={UserForm}/>
        <Route path="users/edit/:userId" component={UserForm}/>
      </Router>

      
    </Route>
  )
}

export default routes