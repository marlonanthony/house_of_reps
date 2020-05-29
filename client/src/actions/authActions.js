import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'
import { GET_ERRORS, SET_CURRENT_USER } from './types'

// Register User
export const registerUser = (userData, history) => async dispatch => {
  try {
    await axios.post('/api/users/register', userData)
    history.push('/checkemail')
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

// Login Get user token
export const loginUser = userData => async dispatch => {
  try {
    const res = await axios.post('/api/users/login', userData)
    const { token } = res.data
    localStorage.setItem('jwtToken', token)
    setAuthToken(token)
    const decoded = jwt_decode(token)
    dispatch(setCurrentUser(decoded))
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

// Update user info (password for now)
export const updateUserInfo = (userData, history) => async dispatch => {
  try {
    await axios.put('/api/users/update', userData)
    alert('Your password has been updated')
    history.push('/dashboard')
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Log user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken')
  setAuthToken(false)
  dispatch(setCurrentUser({}))
}
