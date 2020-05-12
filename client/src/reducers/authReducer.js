import isEmpty from '../utils/is_empty/is-empty'
import { SET_CURRENT_USER, UPDATE_USER } from '../actions/types'

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload.savedUser
      }
    default:
      return state
  }
}
