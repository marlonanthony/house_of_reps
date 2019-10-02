import React from 'react'
import Dropzone from 'react-dropzone'

export default function Avatar({
  onImageDrop,
  uploadedFile,
  uploadedFileCloudinaryUrl
}) {
  return (
    <div className="djpools-dropzone">
      <div className="FileUpload">
        <Dropzone
          className="dropzone" // In UI/dropzone
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
            style={{ height: '50px', width: '50px', borderRadius: '50%' }}
            alt={uploadedFile.name}
          />
        )}
      </div>
    </div>
  )
}
