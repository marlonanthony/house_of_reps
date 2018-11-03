import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' 
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { clearCurrentProfile } from './actions/profileActions';
import { Provider } from 'react-redux' 
import store from './store' 

import PrivateRoute from './components/common/PrivateRoute'
import DropdownMenu from './components/layout/DropdownMenu'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/create-profile/CreateProfile'
import EditProfile from './components/edit-profile/EditProfile'
import AddVenue from './components/add-credentials/AddVenue'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'
import './App.css';

// Check for token
if(localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken) 
  // Decode token and get user info and experation
  const decoded = jwt_decode(localStorage.jwtToken)
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded)) 
  // Check for expired token
  const currentTime = Date.now() / 1000
  if(decoded.exp < currentTime) {
    // Logout user 
    store.dispatch(logoutUser())
    // Clear current Profile
    store.dispatch(clearCurrentProfile())
    // Redirect to homepage
    window.location.href = '/' 
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <React.Fragment>
            <React.Fragment>
              <DropdownMenu />
              <Route exact path='/' component={ Landing } />
            </React.Fragment>
            <React.Fragment>
            <Route exact path='/register' component={ Register } />
            <Route exact path='/login' component={ Login } />
            <Switch>
              <PrivateRoute exact path='/dashboard' component={ Dashboard } />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/create-profile' component={ CreateProfile } />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/edit-profile' component={ EditProfile } />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/add-venue' component={ AddVenue } />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/feed' component={ Posts } />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/profile/:handle' component={ Profile } />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/djs' component={ Profiles } />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/post/:id' component={ Post } />
            </Switch>
            </React.Fragment>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
