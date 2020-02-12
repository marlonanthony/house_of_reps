import React from 'react'
import Dropzone from 'react-dropzone'

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
