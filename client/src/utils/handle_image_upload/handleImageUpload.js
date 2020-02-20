import request from 'superagent'

const CLOUDINARY_UPLOAD_PRESET = 'btq6upaq'
const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/dbwifrjvy/image/upload'

export const handleImageUpload = (
  file,
  setUploadedFileCloudinaryUrl,
  setImage
) => {
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
