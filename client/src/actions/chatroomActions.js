import axios from 'axios'

import { CREATE_CHATROOM, GET_CHATROOM, CHATROOM_LOADING } from './types'

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
