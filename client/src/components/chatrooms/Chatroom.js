import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import {
  getChatroom,
  acceptChatroomInvite,
  deleteChatroom,
  addMembers
} from '../../actions/chatroomActions'
import { getCurrentProfile, leaveChatroom } from '../../actions/profileActions'
import Dms from './dms/Dms'
import SideDrawer from './side_drawer/SideDrawer'
import './Chatroom.css'

function Chatroom({
  getChatroom,
  getCurrentProfile,
  acceptChatroomInvite,
  chatroom,
  profile,
  deleteChatroom,
  leaveChatroom,
  addMembers,
  ...props
}) {
  const [errors, setErrors] = useState(''),
    [accepted, setAccepted] = useState(false),
    [showForm, setShowForm] = useState(false),
    [inviteMore, setInviteMore] = useState([]),
    // [makeMod, setMakeMod] = useState(false),
    [toggleDrawer, setToggleDrawer] = useState(false)

  useEffect(() => {
    getChatroom(props.match.params.id)
    getCurrentProfile()
  }, [])

  useEffect(() => {
    if (chatroom.chatroom.err) {
      setErrors(chatroom.chatroom.err.response.data.error)
    }
  }, [setErrors, chatroom.chatroom.err])

  const { name, members, moderators, invites, admin, _id } = chatroom.chatroom

  const invite =
    profile &&
    profile.profile &&
    profile.profile.chatroomInvites &&
    profile.profile.chatroomInvites.filter(
      me => me.id === _id
    )[0]

  const member = members && members.filter(me => me.id === props.auth.user.id)[0]

  const mods = moderators && moderators.filter(me => me.id === props.auth.user.id)[0]

  if (errors) return <Redirect to="/dashboard" />

  return (
    <>
      <SideDrawer
          _id={_id}
          props={props}
          profile={profile}
          invite={invite}
          accepted={accepted}
          setAccepted={setAccepted}
          admin={admin}
          addMembers={addMembers}
          mods={mods}
          moderators={moderators}
          member={member}
          members={members}
          invites={invites}
          inviteMore={inviteMore}
          setInviteMore={setInviteMore}
          showForm={showForm}
          setShowForm={setShowForm}
          toggleDrawer={toggleDrawer}
          leaveChatroom={leaveChatroom}
          deleteChatroom={deleteChatroom}
          acceptChatroomInvite={acceptChatroomInvite}
      />
      <Dms chatroomName={name} chatroomId={_id} user={props.auth.user} setToggleDrawer={setToggleDrawer} />
    </>
  )
}

Chatroom.propTypes = {
  chatroom: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getChatroom: PropTypes.func.isRequired,
  acceptChatroomInvite: PropTypes.func.isRequired,
  deleteChatroom: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  leaveChatroom: PropTypes.func.isRequired,
  addMembers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  chatroom: state.chatroom,
  profile: state.profile,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {
    getChatroom,
    acceptChatroomInvite,
    deleteChatroom,
    getCurrentProfile,
    leaveChatroom,
    addMembers
  }
)(withRouter(Chatroom))
