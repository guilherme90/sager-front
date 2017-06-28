import api from '../../../http/axiosRequest'

const UserService = {
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
    return api.get('/users', {
      search: query
    })
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
  }
}

export default UserService