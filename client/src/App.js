import React, { Component, Fragment, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' 
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { clearCurrentProfile } from './actions/profileActions';
import { Provider } from 'react-redux' 
import store from './store' 

// import PrivateRoute from './components/common/PrivateRoute'
// import DropdownMenu from './components/layout/DropdownMenu'
// import Landing from './components/layout/Landing'
// import Register from './components/auth/Register'
// import Login from './components/auth/Login'
// import Dashboard from './components/dashboard/Dashboard'
// import CreateProfile from './components/create-profile/CreateProfile'
// import EditProfile from './components/edit-profile/EditProfile'
// import AddVenue from './components/add-credentials/AddVenue'
// import AddDjpool from './components/add-credentials/AddDjpool'
// import AddCertifiedStore from './components/add-credentials/AddCertifiedStore'
// import AddPerk from './components/add-credentials/AddPerk'
// import AddBrand from './components/add-credentials/AddBrand'
// import Profiles from './components/profiles/Profiles'
// import Profile from './components/profile/Profile'
// import Posts from './components/posts/Posts'
// import Post from './components/post/Post'
import Spinner from './components/common/Spinner'
import './App.css'

const PrivateRoute = lazy(() => import('./components/common/PrivateRoute'))
const DropdownMenu = lazy(() => import('./components/layout/DropdownMenu'))
const Landing = lazy(() => import('./components/layout/Landing'))
const Register = lazy(() => import('./components/auth/Register'))
const Login = lazy(() => import('./components/auth/Login'))
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'))

const CreateProfile = lazy(() => import('./components/create-profile/CreateProfile'))
const EditProfile = lazy(() => import('./components/edit-profile/EditProfile'))
const AddVenue = lazy(() => import('./components/add-credentials/AddVenue'))
const AddDjpool = lazy(() => import('./components/add-credentials/AddDjpool'))
const AddCertifiedStore = lazy(() => import('./components/add-credentials/AddCertifiedStore'))
const AddPerk = lazy(() => import('./components/add-credentials/AddPerk'))
const AddBrand = lazy(() => import('./components/add-credentials/AddBrand'))
const Profiles = lazy(() => import('./components/profiles/Profiles'))
const Profile = lazy(() => import('./components/profile/Profile'))
const Posts = lazy(() => import('./components/posts/Posts'))
const Post = lazy(() => import('./components/post/Post'))



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
      <Suspense fallback={<Spinner />}>
        <Provider store={ store }>
          <Router>
            <Fragment>
              <Fragment>
                <DropdownMenu />
                <Route exact path='/' component={ Landing } />
              </Fragment>
              <Fragment>
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
              </Fragment>
            </Fragment>
          </Router>
        </Provider>
      </Suspense>
    );
  }
}

export default App;
