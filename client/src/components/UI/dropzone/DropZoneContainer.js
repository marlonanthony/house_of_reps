import React from 'react'
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types'

export default function DropZoneContainer({
  onImageDrop,
  uploadedFile,
  uploadedFileCloudinaryUrl
}) {
  return (
    <div className="dropzone-container">
      <Dropzone
        className="dropzone"
        multiple={false}
        accept="image/*"
        onDrop={onImageDrop}
      >
        <p>Drag or click here to upload a file.</p>
      </Dropzone>
      {uploadedFileCloudinaryUrl && (
        <img
          src={uploadedFileCloudinaryUrl}
          className="dropzone_img"
          alt={uploadedFile.name}
        />
      )}
    </div>
  )
}

DropZoneContainer.propTypes = {
  onImageDrop: PropTypes.func.isRequired,
  uploadedFile: PropTypes.any.isRequired,
  uploadedFileCloudinaryUrl: PropTypes.string.isRequired
}
