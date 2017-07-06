/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import api from '../../../../http/axiosRequest'

export default {
  /**
   * @return {Promise}
   */
  findAllAddress(customerId) {
    return api.get(`/customers/${customerId}/addresses`)
  },

  /**
   * @return {Promise}
   */
  findAllStates() {
    return api.get('/states')
  },

  /**
   * @param {String} stateInitials 
   * @param {String} query 
   * 
   * @return {Promise|false}
   */
  searchCities(stateInitials, query) {
    if (stateInitials && query) {
      return api.get(`/states/${stateInitials}/cities`, {
        params: { search: query }
      })
    }

    return false
  }
}