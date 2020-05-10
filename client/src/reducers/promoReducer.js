import { ADD_PROMO, GET_PROMOS } from '../actions/types'

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
    case ADD_PROMO:
      return {
        ...state,
        promos: [action.payload, ...state.promos],
        loading: false
      }
    default:
      return state
  }
}
