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
  },

  /**
   * @param {Object} data 
   * @param {String|null|undefined} userId 
   * 
   * @return {Promise}
   */
  save(data, customerId, addressId) {
    if (addressId) {
      return api.put(`/customers/${customerId}/addresses/${addressId}`, data)
    }

    return api.post(`/customers/${customerId}/addresses`, data)
  },
}