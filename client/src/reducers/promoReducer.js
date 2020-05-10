import { ADD_PROMO, GET_PROMOS, DELETE_PROMO } from '../actions/types'

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
    case DELETE_PROMO:
      return {
        ...state,
        promos: state.promos.filter(promo => promo._id !== action.payload)
      }
    default:
      return state
  }
}
