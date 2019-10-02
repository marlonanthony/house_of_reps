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
    const { token } = res.data // Extract token from response
    localStorage.setItem('jwtToken', token) // Set token to local storage
    setAuthToken(token) // Set token to Auth header
    const decoded = jwt_decode(token) // Decode token to get user data
    dispatch(setCurrentUser(decoded)) // Set current user
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
