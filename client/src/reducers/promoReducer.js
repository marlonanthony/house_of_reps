import { GET_ERRORS, ADD_PROMOS, GET_PROMOS } from '../actions/types'

const initialState = {
  promos: [],
  promo: {},
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROMOS:
      return {
        ...state,
        promos: action.payload,
        loading: false
      }
    default:
      return state
  }
}
