import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { addVenue } from '../../actions/profileActions'
import Input from '../../components/common/inputs/Input'
import TextArea from '../../components/common/textarea/TextArea'
import BackButton from '../../components/UI/buttons/back-btn/BackButton'
import SubmitButton from '../../components/UI/buttons/submit-btn/SubmitButton'
import './AddMedia.css'

const AddMedia = ({ addVenue, ...props }) => {
  const [description, setDiscription] = useState(''),
    [errors, setErrors] = useState({}),
    [title, setTitle] = useState(''),
    [video, setVideo] = useState('')

  useEffect(() => {
    setErrors(props.errors)
  }, [props.errors])

  const onPaste = e => {
    let clipboardData = e.clipboardData || window.clipboardData
    let urlData = `${'' + clipboardData.getData('Text')}`
    let parsedUrl = urlData.slice(7, -10)
    parsedUrl = parsedUrl.includes('soundcloud')
      ? (parsedUrl = parsedUrl
          .match(/src.*/g)
          .toString()
          .slice(5, -1))
      : parsedUrl.includes('youtube' || 'youtu.be')
      ? (parsedUrl = parsedUrl
          .match(/http(.*?)[\s]/g)
          .toString()
          .slice(0, -2))
      : parsedUrl.includes('mixcloud')
      ? (parsedUrl = parsedUrl
          .match(/(?:www|https?)[^\s]*/g)
          .toString()
          .slice(0, -1))
      : null
    setVideo(parsedUrl)
  }

  const onSubmit = e => {
    e.preventDefault()
    const venueData = {
      description,
      title,
      video
    }
    addVenue(venueData, props.history)
  }

  return (
    <div>
      <BackButton />
      <h2>Add Media</h2>
      <div className="media_input_wrapper">
        <form onSubmit={onSubmit}>
          <Input
            placeholder="Title"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            error={errors.title}
          />
          <Input
            name="video"
            value={video}
            onPaste={onPaste}
            error={errors.video}
            placeholder="Paste embed code"
          />
          <TextArea
            placeholder="Quick description"
            name="description"
            value={description}
            onChange={e => setDiscription(e.target.value)}
            error={errors.description}
          />
          <SubmitButton />
        </form>
      </div>
    </div>
  )
}

AddMedia.propTypes = {
  errors: PropTypes.object.isRequired,
  addVenue: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ errors: state.errors })

export default connect(
  mapStateToProps,
  { addVenue }
)(withRouter(AddMedia))
