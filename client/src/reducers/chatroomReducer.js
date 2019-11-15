import { GET_CHATROOM, CHATROOM_LOADING } from '../actions/types'

const initialState = {
  chatrooms: [],
  chatroom: {},
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CHATROOM_LOADING:
      return {
        ...state,
        loading: true
      }

    case GET_CHATROOM:
      return {
        ...state,
        chatroom: action.payload,
        loading: false
      }

    default:
      return state
  }
}
