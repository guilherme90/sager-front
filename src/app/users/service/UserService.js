/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import api from '../../../http/axiosRequest'

export default {
  /**
   * @return Promise
   */
  findAllUsers() {
    return api.get('/users')
  },

  /**
   * @param {String} userId 
   * 
   * @return {Promise}
   */
  findById(userId) {
    return api.get(`/users/${userId}`)
  },

  /**
   * @param {String} query 
   * 
   * @return {Promise}
   */
  searchUsers(query) {
    if (query) {
      return api.get('/users', {
        params: { search: query }
      })
    }

    return this.findAllUsers()
  },

  /**
   * @param {Object} data 
   * @param {String|null|undefined} userId 
   * 
   * @return {Promise}
   */
  save(data, userId) {
    if (userId) {
      return api.put(`/users/${userId}`, data)
    }

    return api.post('/users', data)
  },

  /**
   * @param {String} userId 
   * 
   * @return {Promise}
   */
  remove(userId) {
    return api.delete(`/users/${userId}`)
  }
}