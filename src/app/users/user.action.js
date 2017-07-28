/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import { 
  USER, 
  USER_SEARCH,
  USER_REMOVE
} from './user.type'
import api from '../../http/axiosRequest'

export const getUsers = (dispatch) => {
  return dispatch => {
    dispatch({
      type: USER.PENDING
    })

    return api.get('/users')
      .then(response => dispatch({ type: USER.SUCCESS, payload: response.data }) )
      .catch(error => dispatch({ type: USER.FAILURE, payload: error }) )
  }
}

/**
 * @param {String} query 
 */
export const searchUsers = (query) => {
  return dispatch => {
    dispatch({
      type: USER_SEARCH.PENDING
    })

    return api.get('/users', { params: { search: query } })
      .then(response => dispatch({ type: USER_SEARCH.SUCCESS, payload: response.data }) )
      .catch(error => dispatch({ type: USER_SEARCH.FAILURE, payload: error }) )
  }
}

export const removeUser = (userId, callback) => {
  return dispatch => {
    dispatch({
      type: USER_REMOVE.PENDING
    })

    return api.delete(`/users/${userId}`)
      .then(response => {
        dispatch({ type: USER_REMOVE.SUCCESS, payload: userId })

        return callback()
      })
      .catch(error => dispatch({ type: USER_REMOVE.FAILURE, payload: error }) )
  }
}