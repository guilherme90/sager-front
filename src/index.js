/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'

import { configureStores } from './app/root.stores'

import routes from './routes'
import RootRoutes from './app/RootRoutes'
//import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootswatch/paper/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'sweetalert2/dist/sweetalert2.min.css'

const __DEV__ = process.env.NODE_ENV === 'development';

if (__DEV__) {
  const renderApp = (routes) => {
    render(
        <AppContainer>
          <Provider store={configureStores}>
            <RootRoutes routes={routes} />
          </Provider>
        </AppContainer>
      ,
      document.querySelector('#root')
    )
  }

  renderApp(routes)

  if (module.hot) {
    module.hot.accept('./routes', () => {
      const newRoutes = require('./routes').default

      renderApp(newRoutes)
    })
  }
}

if (! __DEV__) {
  const renderApp = (routes) => {
    render(
      <Provider store={configureStores}>
        <RootRoutes routes={routes} />
      </Provider>,
      document.querySelector('#root')
    )
  }

  renderApp(routes)
}