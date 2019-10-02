import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { clearCurrentProfile } from './actions/profileActions'
import store from './store'
import './index.css'
import App from './App'

// Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken) // Set auth token header auth
  const decoded = jwt_decode(localStorage.jwtToken) // Decode token and get user info and expiration
  store.dispatch(setCurrentUser(decoded)) // Set user and isAuthenticated
  const currentTime = Date.now() / 1000 // Check for expired token
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser()) // Logout user
    store.dispatch(clearCurrentProfile()) // Clear current Profile
    window.location.href = '/' // Redirect to homepage
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
