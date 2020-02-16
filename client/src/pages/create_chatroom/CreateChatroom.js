import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { createChatroom } from '../../actions/chatroomActions'
import { getProfiles } from '../../actions/profileActions'
import Input from '../../components/common/inputs/Input'
import SearchReps from './SearchReps'
import BackButton from '../../components/UI/buttons/back-btn/BackButton'
import SubmitButton from '../../components/UI/buttons/submit-btn/SubmitButton'
import './CreateChatroom.css'

const CreateChatroom = ({ createChatroom, getProfiles, ...props }) => {
  const [name, setName] = useState(''),
    [invites, setInvites] = useState([]),
    [moderators, setModerators] = useState([]),
    [errors, setErrors] = useState({})

  useEffect(() => {
    getProfiles()
  }, [])

  useEffect(() => {
    setErrors(props.errors)
  }, [props.errors])

  const onSubmit = e => {
    e.preventDefault()
    const chatroomData = {
      name,
      invites,
      moderators
    }
    createChatroom(chatroomData, props.history)
  }
  return (
    <div>
      <BackButton />
      <h2>Create Chatroom</h2>
      <div className="create_chatroom_wrapper">
        <form onSubmit={onSubmit}>
          <Input
            placeholder="Give your chatroom a name"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            error={errors.name}
          />
          <div style={{ display: 'flex' }}>
            <SearchReps
              profiles={props.profile.profiles}
              setInvites={setInvites}
              placeholder="Invite Members"
            />
            <SearchReps
              profiles={props.profile.profiles}
              setModerators={setModerators}
              placeholder="Invite Moderators"
            />
          </div>
          <SubmitButton />
        </form>
      </div>
      <div className="invites_mods_container">
        <div className="create_chatroom_card">
          <p className="create_chatroom_titles">Members</p>
          <ul>
            {invites &&
              invites.map(person => (
                <li key={person.id} className="create_chatroom_list_elements">
                  {person.name}{' '}
                  <span
                    className="remove_chatroom_member_or_mod"
                    onClick={() =>
                      setInvites(p => p.filter(val => val.id !== person.id))
                    }
                  >
                    x
                  </span>
                </li>
              ))}
          </ul>
        </div>
        <div className="create_chatroom_card">
          <p className="create_chatroom_titles">Moderators</p>
          <ul>
            {moderators.map(person => (
              <li key={person.id} className="create_chatroom_list_elements">
                {person.name}{' '}
                <span
                  className="remove_chatroom_member_or_mod"
                  onClick={() =>
                    setModerators(m => m.filter(val => val.id !== person.id))
                  }
                >
                  x
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

CreateChatroom.propTypes = {
  errors: PropTypes.object.isRequired,
  createChatroom: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
})

export default connect(
  mapStateToProps,
  { createChatroom, getProfiles }
)(withRouter(CreateChatroom))
