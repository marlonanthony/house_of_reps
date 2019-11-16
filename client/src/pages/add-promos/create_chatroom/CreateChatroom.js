import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { createChatroom } from '../../../actions/chatroomActions'
import { getProfiles } from '../../../actions/profileActions'
import Input from '../../../components/common/inputs/Input'
import SearchReps from './SearchReps'

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
      invites: [...new Set(invites)],
      moderators: [...new Set(moderators)]
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
              placeholder="Invite People"
            />
            <SearchReps
              profiles={props.profile.profiles}
              setModerators={setModerators}
              placeholder="Add Moderators"
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
