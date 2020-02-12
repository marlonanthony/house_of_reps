import React from 'react'
import Dropzone from 'react-dropzone'

export default function DropZoneContainer({
  onImageDrop,
  uploadedFile,
  uploadedFileCloudinaryUrl
}) {
  return (
    <div className="dropzone-container">
      <div className="FileUpload">
        <Dropzone
          className="dropzone"
          multiple={false}
          accept="image/*"
          onDrop={onImageDrop}
        >
          <p>Drag or click here to upload a file.</p>
        </Dropzone>
      </div>
      <div>
        {uploadedFileCloudinaryUrl === '' ? null : (
          <img
            src={uploadedFileCloudinaryUrl}
            className="dropzone_img"
            alt={uploadedFile.name}
          />
        )}
      </div>
    </div>
  )
}
