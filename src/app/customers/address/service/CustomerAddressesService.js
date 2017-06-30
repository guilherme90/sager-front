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
  }
}