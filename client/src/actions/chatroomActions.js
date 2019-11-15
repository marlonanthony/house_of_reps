import axios from 'axios'

import { GET_CHATROOM, CHATROOM_LOADING } from './types'

// Get Chatroom by id
export const getChatroom = id => async dispatch => {
  try {
    dispatch(chatroomLoading())
    const res = await axios.get(`/api/chat/${id}`)
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

// Set loading state
export const chatroomLoading = () => {
  return {
    type: CHATROOM_LOADING
  }
}
