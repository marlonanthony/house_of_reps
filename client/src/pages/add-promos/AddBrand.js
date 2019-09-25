import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types' 
import Dropzone from 'react-dropzone' 
import request from 'superagent' 

import { addBrand } from '../../actions/profileActions'
import Input from '../../components/common/inputs/Input'
import '../../components/UI/dropzone/Dropzone.css'

const CLOUDINARY_UPLOAD_PRESET = 'btq6upaq'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dbwifrjvy/image/upload'

const AddBrand = ({
  addBrand,
  ...props
}) => {
  const [image, setImage] = useState(''),
        [url, setUrl] = useState(''),
        [description, setDiscription] = useState(''),
        [errors, setErrors] = useState({}),
        [uploadedFileCloudinaryUrl, setUploadedFileCloudinaryUrl] = useState(''),
        [uploadedFile, setUploadedFile] = useState('')

  useEffect(() => {
    setErrors(props.errors)
  }, [props.errors])

  const onSubmit = e => {
    e.preventDefault()
    const brandData = {
      image,
      url,
      description
    }
    addBrand(brandData, props.history)
  }

  const onImageDrop = files => {
    setUploadedFile(files[0])
    handleImageUpload(files[0])
  }

  const handleImageUpload = file => {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file) 
    
    upload.end((err, response) => {
      if(err) console.log(err) 
      if(response.body.secure_url !== '') {
        setUploadedFileCloudinaryUrl(response.body.secure_url)
        setImage(response.body.secure_url)
      }
    })
  }

  return (
    <div className='add-djpool'>
      <i 
        onClick={props.history.goBack} 
        id='addvenue-back-button' 
        className='fas fa-arrow-alt-circle-left' 
        alt='back-button' 
      />
      <h2>Add Brand</h2>
      {/* setting input div classname to djpools for lack of repitition */}
      <div className='djpools_input_wrapper'>
        <div className='djpools-dropzone'>
          <div className='FileUpload'>
            <Dropzone 
              className='dropzone'  // In UI/dropzone
              multiple={false}
              accept='image/*'
              onDrop={onImageDrop}>
              <p>Drag or click here to upload a file.</p>
            </Dropzone>
          </div>
          <div>
            { uploadedFileCloudinaryUrl === '' ? null : 
              <img 
                src={uploadedFileCloudinaryUrl} 
                style={{ height: '50px', width: '50px' }}
                alt={uploadedFile.name} />
            }
          </div>
        </div>
        <form onSubmit={ onSubmit }>
          <Input 
              name='url'
              type='text'
              value={ url }
              onChange={ e => setUrl(e.target.value) }
              error={ errors.url }
              placeholder='URL'
            />
          <Input 
            name='image'
            type='text'
            value={ image }
            onChange={ e => setImage(e.target.value) }
            error={ errors.image }
            placeholder='image'
          />
          <Input 
            name='description'
            type='text'
            value={ description }
            onChange={ e => setDiscription(e.target.value) }
            error={ errors.description }
            placeholder='description'
          />
          <div style={{textAlign: 'center'}}>
            <input type="submit" value='Submit' id='add-djpools-submit-button' />
          </div>
        </form>
      </div>
    </div>
  )
}

AddBrand.propTypes = {
  errors: PropTypes.object.isRequired,
  addBrand: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps, { addBrand })(withRouter(AddBrand))