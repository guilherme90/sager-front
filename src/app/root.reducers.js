/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import { combineReducers } from 'redux'
import { usersReducers } from './users/user.reducer'

 export const rootReducers = combineReducers({
   users: usersReducers
 })