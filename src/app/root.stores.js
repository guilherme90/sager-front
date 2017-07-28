/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import { 
  createStore, 
  applyMiddleware,
  compose
} from 'redux'
import thunkMiddleware from 'redux-thunk';
import { rootReducers } from './root.reducers'

const __DEV__ = process.env.NODE_ENV === 'development';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export const configureStores = createStore(
  rootReducers,
  compose(
    applyMiddleware(thunkMiddleware),
    devTools
  )
);