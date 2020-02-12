import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import request from 'superagent'

import Input from '../../components/common/inputs/Input'
import BackButton from '../../components/UI/icons/back-btn/BackButton'
import SubmitButton from '../../components/UI/icons/submit-btn/SubmitButton'
import DropZoneContainer from '../../components/UI/dropzone/DropZoneContainer'
import '../../components/UI/dropzone/Dropzone.css'
import './AddPromo.css'

const CLOUDINARY_UPLOAD_PRESET = 'btq6upaq'
const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/dbwifrjvy/image/upload'

const AddPromo = ({ action, title, ...props }) => {
  const [image, setImage] = useState(''),
    [url, setUrl] = useState(''),
    [description, setDescription] = useState(''),
    [errors, setErrors] = useState({}),
    [uploadedFileCloudinaryUrl, setUploadedFileCloudinaryUrl] = useState(''),
    [uploadedFile, setUploadedFile] = useState({})

  useEffect(() => {
    setErrors(props.errors)
  }, [props.errors])

  const onSubmit = e => {
    e.preventDefault()
    const promoData = {
      image,
      url,
      description
    }
    action(promoData, props.history)
  }

  const onImageDrop = files => {
    setUploadedFile(files[0])
    handleImageUpload(files[0])
  }

  const handleImageUpload = file => {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file)

    upload.end((err, response) => {
      if (err) console.log(err)
      if (response.body.secure_url !== '') {
        setUploadedFileCloudinaryUrl(response.body.secure_url)
        setImage(response.body.secure_url)
      }
    })
  }

  return (
    <div>
      <BackButton />
      <h2>{title}</h2>
      <div className="promos_input_wrapper">
        <DropZoneContainer
          onImageDrop={onImageDrop}
          uploadedFileCloudinaryUrl={uploadedFileCloudinaryUrl}
          uploadedFile={uploadedFile}
        />
        <form onSubmit={onSubmit}>
          <Input
            name="url"
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            error={errors.url}
            placeholder="DJ Pool URL"
          />
          <Input
            name="image"
            type="text"
            value={image}
            onChange={e => setImage(e.target.value)}
            error={errors.image}
            placeholder="Image URL"
          />
          <Input
            name="description"
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            error={errors.description}
            placeholder="Description"
          />
          <SubmitButton />
        </form>
      </div>
    </div>
  )
}

AddPromo.propTypes = {
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({ errors: state.errors })

export default connect(mapStateToProps)(AddPromo)
