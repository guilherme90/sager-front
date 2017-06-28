/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import swal from 'sweetalert2'

/**
 * @param {Object} props
 * @return {Promise}
 */

const SweetAlert = {
  confirm(text) {
    return swal({
      title: 'Confirmação',
      text: text || '',
      type: 'question',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      confirmButtonColor: '#439a46',
      cancelButtonColor: '#cb171e'
    })
  },

  error(text) {
    return swal({
      title: 'Ooops!',
      text: text || '',
      type: 'error',
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonColor: '#cb171e'
    })
  }
}

export default SweetAlert