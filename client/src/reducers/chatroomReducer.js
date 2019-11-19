import {
  CREATE_CHATROOM,
  GET_CHATROOM,
  CHATROOM_LOADING,
  ACCEPT_CHATROOM_INVITE,
  DELETE_CHATROOM
} from '../actions/types'

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

    case CREATE_CHATROOM:
      return {
        ...state,
        chatroom: action.payload.chatroom,
        loading: false
      }

    case GET_CHATROOM:
      return {
        ...state,
        chatroom: action.payload,
        loading: false
      }

    case ACCEPT_CHATROOM_INVITE:
      return {
        ...state,
        chatroom: action.payload.chatroom,
        loading: false
      }

    case DELETE_CHATROOM:
      return {
        ...state,
        chatroom: {},
        loading: false
      }

    default:
      return state
  }
}
