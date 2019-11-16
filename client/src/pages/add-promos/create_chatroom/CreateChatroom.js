import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { createChatroom } from '../../../actions/chatroomActions'
import { getProfiles } from '../../../actions/profileActions'
import Input from '../../../components/common/inputs/Input'
import SearchReps from './SearchReps'
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
  console.log(invites)
  console.log(moderators)
  return (
    <div className="add-venue">
      <i
        onClick={props.history.goBack}
        id="addvenue-back-button"
        className="fas fa-arrow-alt-circle-left"
        alt="back-button"
      />
      <h2>Create Chatroom</h2>
      <div className="djpools_input_wrapper">
        <form onSubmit={onSubmit}>
          <Input
            placeholder="Name"
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
          <div className="venue-submit-btn-containing-div">
            <input
              type="submit"
              value="Submit"
              id="add-djpools-submit-button"
              title="submit"
            />
          </div>
        </form>
      </div>
      <div className="invites_mods_container">
        <div className="create_chatroom_card">
          <p className="create_chatroom_titles">Members</p>
          <li>
            {invites &&
              invites.map(person => (
                <ol key={person.id} className="create_chatroom_list_elements">
                  {person.name}{' '}
                  <span
                    onClick={() =>
                      setInvites(p => p.filter(val => val.id !== person.id))
                    }
                  >
                    x
                  </span>
                </ol>
              ))}
          </li>
        </div>
        <div className="create_chatroom_card">
          <p className="create_chatroom_titles">Moderators</p>
          <li>
            {moderators.map(person => (
              <ol key={person.id} className="create_chatroom_list_elements">
                {person.name}{' '}
                <span
                  onClick={() =>
                    setModerators(m => m.filter(val => val.id !== person.id))
                  }
                >
                  x
                </span>
              </ol>
            ))}
          </li>
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
