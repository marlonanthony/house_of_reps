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
import AddMedia from './pages/add_media/AddMedia'
import CreateChatroom from './pages/create_chatroom/CreateChatroom'
import AddDjpool from './pages/add_promo/AddPool'
import AddStore from './pages/add_promo/AddStore'
import AddPerk from './pages/add_promo/AddPerk'
import AddBrand from './pages/add_promo/AddBrand'
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
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/checkemail" component={ConfirmEmail} />
        <Route exact path="/verify" component={Verify} />
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute
            exact
            path="/create-profile"
            component={CreateProfile}
          />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute exact path="/add-venue" component={AddMedia} />
          <PrivateRoute
            exact
            path="/create-chatroom"
            component={CreateChatroom}
          />
          <PrivateRoute exact path="/add-djpool" component={AddDjpool} />
          <PrivateRoute exact path="/add-store" component={AddStore} />
          <PrivateRoute exact path="/add-perk" component={AddPerk} />
          <PrivateRoute exact path="/add-brand" component={AddBrand} />
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
          <PrivateRoute exact path="/profile/:handle" component={Profile} />
          <PrivateRoute exact path="/djs" component={Profiles} />
          <PrivateRoute exact path="/notifications" component={Notifications} />
          <PrivateRoute exact path="/hashtag/:hashtag" component={Hashtag} />
          <PrivateRoute exact path="/chat/:id" component={Chatroom} />
        </Switch>
      </>
    </>
  )
}

export default App
