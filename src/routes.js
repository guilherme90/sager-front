/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import React from 'react'
import { Route, Router, IndexRoute, Redirect } from 'react-router'

import Dashboard from './app/components/Dashboard'
import Home from './app/components/Home'
import UsersScreen from './app/users/UsersScreen'
import UserForm from './app/users/UserForm'

import CustomersScreen from './app/customers/CustomersScreen'
import CustomerForm from './app/customers/CustomerForm'

const routes = () => {
  return (
    <Route path="/" component={Dashboard}>
      <IndexRoute component={Home} />

      <Router>
        <Route path="users" component={UsersScreen}/>
        <Route path="users/add" component={UserForm}/>
        <Route path="users/edit/:userId" component={UserForm}/>

        <Route path="customers" component={CustomersScreen}/>
        <Route path="customers/add" component={CustomerForm}/>
        <Route path="customers/edit/:customerId" component={CustomerForm}/>
      </Router>
    </Route>
  )
}

export default routes