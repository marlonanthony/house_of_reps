import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { addPromo } from '../../actions/promoActions'
import { handleImageUpload } from '../../utils/handle_image_upload/handleImageUpload'
import Input from '../../components/common/inputs/Input'
import BackButton from '../../components/UI/buttons/back-btn/BackButton'
import SubmitButton from '../../components/UI/buttons/submit-btn/SubmitButton'
import DropZoneContainer from '../../components/UI/dropzone/DropZoneContainer'
import '../../components/UI/dropzone/Dropzone.css'
import './AddPromo.css'

const AddPromo = ({ addPromo, title, type, ...props }) => {
  const [image, setImage] = useState(''),
    [url, setUrl] = useState(''),
    [description, setDescription] = useState(''),
    [errors, setErrors] = useState({}),
    [uploadedFile, setUploadedFile] = useState({}),
    [uploadedFileCloudinaryUrl, setUploadedFileCloudinaryUrl] = useState('')

  useEffect(() => {
    setErrors(props.errors)
  }, [props.errors])

  const onSubmit = e => {
    e.preventDefault()
    const promoData = {
      image,
      url,
      description,
      type
    }
    addPromo(promoData, props.history)
  }

  const onImageDrop = files => {
    setUploadedFile(files[0])
    handleImageUpload(files[0], setUploadedFileCloudinaryUrl, setImage)
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
  errors: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  addPromo: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ errors: state.errors })

export default connect(
  mapStateToProps,
  { addPromo }
)(withRouter(AddPromo))
