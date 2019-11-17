import axios from 'axios'

import {
  CREATE_CHATROOM,
  GET_CHATROOM,
  CHATROOM_LOADING,
  ACCEPT_CHATROOM_INVITE
} from './types'

// Create Chatroom
export const createChatroom = (chatroomData, history) => async dispatch => {
  try {
    dispatch(chatroomLoading())
    const res = await axios.post(`/api/chat`, chatroomData)
    dispatch({
      type: CREATE_CHATROOM,
      payload: res.data
    })
    history.push('/dashboard')
  } catch (err) {
    dispatch({
      type: CREATE_CHATROOM,
      payload: { err }
    })
  }
}

// Get Chatroom by id
export const getChatroom = (id, history) => async dispatch => {
  try {
    dispatch(chatroomLoading())
    const res = await axios.get(`/api/chat/${id}`)
    history && history.push(`/chat/${id}`)
    dispatch({
      type: GET_CHATROOM,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: GET_CHATROOM,
      payload: { err }
    })
  }
}

// Accept Chatroom Invite
export const acceptChatroomInvite = (id, history) => async dispatch => {
  try {
    dispatch(chatroomLoading())
    const res = await axios.post(`/api/chat/accept/${id}`)
    history && history.push(`/chat/${id}`)
    dispatch({
      type: ACCEPT_CHATROOM_INVITE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: ACCEPT_CHATROOM_INVITE,
      payload: { err }
    })
  }
}

// Set loading state
export const chatroomLoading = () => {
  return {
    type: CHATROOM_LOADING
  }
}
