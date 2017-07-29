/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import typeToReducer from 'type-to-reducer';

const initialState = {
  pending: false,
  errorFetching: false,
  message: '',
  data: []
}

export const usersReducers = typeToReducer({
  ['USER']: {
    PENDING: () => ({
      pending: true,
      message: 'Buscando, aguarde...'
    }),
    SUCCESS: (state, action) => ({
      ...state,
      pending: false,
      message: !action.payload.length && 'Não encontramos nenhum usuário cadastrado.',
      data: action.payload.data
    }),
    FAILURE: (state, action) => ({
      ...state,
      pending: false,
      errorFetching: true,
      message: 'Ocorreu um erro ao buscar os usuários. Tente novamente!',
      data: []
    })
  },
  ['USER_SEARCH']: {
    PENDING: (state) => ({
      ...state,
      pending: true,
      message: 'Buscando, aguarde...'
    }),
    SUCCESS: (state, action) => ({
      ...state,
      pending: false,
      message: !action.payload.length && 'Não encontramos nenhum usuário cadastrado.',
      data: action.payload.data
    }),
    FAILURE: (state, action) => ({
      ...state,
      pending: false,
      errorFetching: true,
      message: 'Ocorreu um erro ao buscar os usuários. Tente novamente!',
      data: []
    })
  },
  ['USER_REMOVE']: {
    PENDING: (state) => ({
      ...state,
      pending: true
    }),
    SUCCESS: (state, action) => ({
      ...state,
      pending: false,
      data: state.data.filter(({ _id }) => _id !== action.payload.data._id)
    }),
    FAILURE: (state, action) => ({
      ...state,
      pending: false,
      errorFetching: true,
      message: 'Ocorreu um erro ao remover o usuário. Tente novamente!'
    })
  }
}, initialState)