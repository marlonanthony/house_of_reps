import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'

import { setCurrentUser, logoutUser } from './actions/authActions'
import { clearCurrentProfile } from './actions/profileActions'
import { Provider } from 'react-redux'
import store from './store'
import PrivateRoute from './components/common/PrivateRoute'
import DropdownMenu from './components/common/dropdown_menu/DropdownMenu'
import Landing from './pages/landing/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/create-profile/CreateProfile'
import EditProfile from './components/edit-profile/EditProfile'
import AddVenue from './pages/add-promos/AddVenue'
import AddDjpool from './pages/add-promos/AddDjpool'
import AddCertifiedStore from './pages/add-promos/AddCertifiedStore'
import AddPerk from './pages/add-promos/AddPerk'
import AddBrand from './pages/add-promos/AddBrand'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/profile/Profile'
import Posts from './components/posts/posts/Posts'
import Verify from './components/auth/Verify'
import ConfirmEmail from './components/auth/ConfirmEmail'
import Notifications from './components/posts/post-assets/notifications/Notifications'
import FixedHighlights from './components/UI/uniterrupted_highlights/FixedHighlights'
import Hashtag from './components/hashtags/Hashtag'
import './App.css'

// Check for token
if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)                // Set auth token header auth
  const decoded = jwt_decode(localStorage.jwtToken)  // Decode token and get user info and expiration
  store.dispatch(setCurrentUser(decoded))            // Set user and isAuthenticated
  const currentTime = Date.now() / 1000              // Check for expired token
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser())                     // Logout user 
    store.dispatch(clearCurrentProfile())            // Clear current Profile
    window.location.href = '/'                       // Redirect to homepage
  }
}

class App extends Component {
  state = {
    showHighlight: false,
    currentIndex: 0
  }

  toggleShowHighlight = (currentIndex) => {
    this.setState(prevState => ({
      showHighlight: !prevState.showHighlight,
      currentIndex
    }))
  }

  render() {
    return (
      <Provider store={ store }>
        <Router>
          <>
            <>
              <DropdownMenu />
              <FixedHighlights 
                showHighlight={this.state.showHighlight} 
                toggleShowHighlight={this.toggleShowHighlight}
                currentIndex={this.state.currentIndex}
              />
              <Route exact path='/' component={ Landing } />
            </>
            <div>
              <Route exact path='/register' component={ Register } />
              <Route exact path='/login' component={ Login } />
              <Route exact path='/checkemail' component={ ConfirmEmail } />
              <Route exact path='/verify' component={ Verify } />
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
                <PrivateRoute exact path='/add-djpool' component={ AddDjpool } />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/add-store' component={ AddCertifiedStore } />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/add-perk' component={ AddPerk } />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/add-brand' component={ AddBrand } />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/feed' component={() => <Posts toggleShowHighlight={this.toggleShowHighlight} /> } />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/profile/:handle' component={ Profile } />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/djs' component={ Profiles } />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/notifications' component={ Notifications } />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/hashtag/:hashtag' component={ Hashtag } />
              </Switch>
            </div>
          </>
        </Router>
      </Provider>
    );
  }
}

export default App;
