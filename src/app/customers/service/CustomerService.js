/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import api from '../../../http/axiosRequest'

export default {
  /**
   * @return {Promise}
   */
  findAllCustomers() {
    return api.get('/customers')
  },

  /**
   * @param {String} customerId 
   * 
   * @return {Promise}
   */
  findById(customerId) {
    return api.get(`/customers/${customerId}`)
  },

  /**
   * @param {String} query 
   * 
   * @return {Promise}
   */
  searchCustomers(query) {
    if (query) {
      return api.get('/customers', {
        params: { search: query }
      })
    }

    return this.findAllCustomers()
  },

  /**
   * @param {Object} data 
   * @param {String|null|undefined} customerId 
   * 
   * @return {Promise}
   */
  save(data, customerId) {
    if (customerId) {
      return api.put(`/customers/${customerId}`, data)
    }

    return api.post('/customers', data)
  },

  /**
   * @param {String} customerId 
   * 
   * @return {Promise}
   */
  remove(customerId) {
    return api.delete(`/customers/${customerId}`)
  }
}