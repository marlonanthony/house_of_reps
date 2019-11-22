import axios from 'axios'

import {
  CREATE_CHATROOM,
  GET_CHATROOM,
  CHATROOM_LOADING,
  ACCEPT_CHATROOM_INVITE,
  DELETE_CHATROOM,
  ADD_CHATROOM_MEMBERS
} from './types'

// Create Chatroom
export const createChatroom = (chatroomData, history) => async dispatch => {
  try {
    dispatch(chatroomLoading())
    const res = await axios.post(`/api/chat`, chatroomData)
    history.push('/dashboard')
    dispatch({
      type: CREATE_CHATROOM,
      payload: res.data
    })
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

// Add People to Chatroom
export const addMembers = (id, members) => async dispatch => {
  try {
    dispatch(chatroomLoading())
    const res = await axios.put(`/api/chat/add_members/${id}`, members)
    dispatch({
      type: ADD_CHATROOM_MEMBERS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: ADD_CHATROOM_MEMBERS,
      payload: { err }
    })
  }
}

// Delete Chatroom
export const deleteChatroom = (id, history) => async dispatch => {
  try {
    dispatch(chatroomLoading())
    const res = await axios.delete(`/api/chat/${id}`)
    history.push(`/dashboard`)
    dispatch({
      type: DELETE_CHATROOM,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: DELETE_CHATROOM,
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
