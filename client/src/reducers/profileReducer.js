import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  LIKE_HIGHLIGHT,
  ADD_PROMOS,
  CREATE_CHATROOM,
  DELETE_CHATROOM,
  ACCEPT_CHATROOM_INVITE,
  LEAVE_CHATROOM,
  ADD_CHATROOM_MEMBERS
} from '../actions/types'

const initialState = {
  profile: null,
  profiles: null,
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      }
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      }
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      }
    case LIKE_HIGHLIGHT:
      return {
        ...state,
        profile: action.payload.data,
        loading: false
      }
    case ADD_PROMOS:
      return {
        ...state,
        profile: action.payload,
        loading: false
      }
    case CREATE_CHATROOM:
      return {
        ...state,
        profile: action.payload.profile,
        loading: false
      }
    case DELETE_CHATROOM:
      return {
        ...state,
        profile: action.payload,
        loading: false
      }
    case ACCEPT_CHATROOM_INVITE:
      return {
        ...state,
        profile: action.payload.profile,
        loading: false
      }
    case LEAVE_CHATROOM:
      return {
        ...state,
        profile: action.payload.profile,
        loading: false
      }
    default:
      return state
  }
}
