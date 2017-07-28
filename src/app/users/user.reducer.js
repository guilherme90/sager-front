/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import { 
  USER, 
  USER_SEARCH,
  USER_REMOVE
} from './user.type'

const initialState = {
  pending: false,
  errorFetching: false,
  message: '',
  data: []
}

export const usersReducers = (state = initialState, action) => {
  switch (action.type) {
    // USER
    case USER.PENDING: {
      return {
        ...state,
        pending: true
      }
    }
      
    case USER.SUCCESS: {
      return {
        ...state,
        pending: false,
        message: 'Usuários buscados com sucesso',
        data: action.payload
      }
    }

    case USER.FAILURE: {
      return {
        ...state,
        pending: false,
        errorFetching: true,
        message: 'Ocorreu um erro ao buscar os usuários. Tente novamente!',
        data: []
      }
    }

    // USER_SEARCH
    case USER_SEARCH.PENDING: {
      return {
        ...state,
        pending: true
      }
    }

    case USER_SEARCH.SUCCESS: {
      return {
        ...state,
        pending: false,
        data: action.payload
      }
    }

    case USER_SEARCH.FAILURE: {
      return {
        ...state,
        pending: false,
        errorFetching: true,
        message: 'Ocorreu um erro ao filtrar os usuários. Tente novamente!'
      }
    }

    // USER_REMOVE
    case USER_REMOVE.PENDING: {
      return {
        ...state,
        pending: true,
        message: 'Removendo usuário, aguarde...'
      }
    }

    case USER_REMOVE.SUCCESS: {
      return {
        pending: false,
        message: 'Usuário removido com sucesso',
        data: state.data.filter(({ _id }) => _id !== action.payload)
      }
    }

    case USER_REMOVE.FAILURE: {
      return {
        ...state,
        pending: false,
        errorFetching: true,
        message: 'Ocorreu um erro ao remover o usuário. Tente novamente!'
      }
    }

    default: 
      return state
  }
}