/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import api from '../../http/axiosRequest'

export const getUsers = (dispatch) => {
  return dispatch => {
    dispatch({
      type: 'USER',
      payload: api.get('/users')
    })
  }
}

/**
 * @param {String} query 
 */
export const searchUsers = (query) => {
  return dispatch => {
    dispatch({
      type: 'USER_SEARCH',
      payload: api.get('/users', { params: { search: query } })
    })
  }
}

/**
 * @param {String} userId 
 */
export const removeUser = (userId) => {
  return dispatch => {
    dispatch({
      type: 'USER_REMOVE',
      payload: api.delete(`/users/${userId}`)
    })
  }
}