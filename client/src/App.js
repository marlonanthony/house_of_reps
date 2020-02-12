import React, { useState, useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'

import PrivateRoute from './components/common/PrivateRoute'
import DropdownMenu from './components/common/dropdown_menu/DropdownMenu'
import Landing from './pages/landing/Landing'
import Register from './components/auth/register/Register'
import Login from './components/auth/login/Login'
import Dashboard from './pages/dashboard/Dashboard'
import CreateProfile from './components/create-profile/CreateProfile'
import EditProfile from './components/edit-profile/EditProfile'
import AddVenue from './pages/add-promos/AddVenue'
import CreateChatroom from './pages/add-promos/create_chatroom/CreateChatroom'
import AddDjpool from './pages/add-promos/add_promo/AddPool'
import AddStore from './pages/add-promos/add_promo/AddStore'
import AddPerk from './pages/add-promos/add_promo/AddPerk'
import AddBrand from './pages/add-promos/add_promo/AddBrand'
import Profiles from './pages/profiles/Profiles'
import Profile from './pages/profile/Profile'
import Posts from './pages/posts/Posts'
import Verify from './components/auth/Verify'
import ConfirmEmail from './components/auth/ConfirmEmail'
import Notifications from './pages/notifications/Notifications'
import FixedHighlights from './components/UI/uniterrupted_highlights/FixedHighlights'
import Hashtag from './components/hashtags/Hashtag'
import Chatroom from './components/chatrooms/Chatroom'
import './App.css'

const App = () => {
  const [showHighlight, setShowHighlight] = useState(false)

  const toggleHighlight = useCallback(() => {
    setShowHighlight(prev => !prev)
  }, [setShowHighlight])

  return (
    <>
      <>
        <DropdownMenu />
        <FixedHighlights
          showHighlight={showHighlight}
          toggleHighlight={toggleHighlight}
        />
        <Route exact path="/" component={Landing} />
      </>
      <div>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/checkemail" component={ConfirmEmail} />
        <Route exact path="/verify" component={Verify} />
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
        <Switch>
          <PrivateRoute
            exact
            path="/create-profile"
            component={CreateProfile}
          />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/add-venue" component={AddVenue} />
        </Switch>
        <Switch>
          <PrivateRoute
            exact
            path="/create-chatroom"
            component={CreateChatroom}
          />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/add-djpool" component={AddDjpool} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/add-store" component={AddStore} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/add-perk" component={AddPerk} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/add-brand" component={AddBrand} />
        </Switch>
        <Switch>
          <PrivateRoute
            exact
            path="/feed"
            component={() => (
              <Posts
                toggleHighlight={toggleHighlight}
                showHighlight={showHighlight}
              />
            )}
          />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/profile/:handle" component={Profile} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/djs" component={Profiles} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/notifications" component={Notifications} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/hashtag/:hashtag" component={Hashtag} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/chat/:id" component={Chatroom} />
        </Switch>
      </div>
    </>
  )
}

export default App
