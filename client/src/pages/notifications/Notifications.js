import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import PropTypes from 'prop-types'

import { getPost } from '../../actions/postActions'
import ShowPost from './ShowPost'
import NotificationList from './NotificationList'
import './Notifications.css'

const Notifications = ({ getPost, ...props }) => {
  const [notifications, setNotifications] = useState([]),
    [showPost, setShowPost] = useState(false)

  useEffect(() => {
    axios.get('/api/profile/notifications').then(res => {
      setNotifications(res.data)
    })
    return () => {
      axios.post('/api/profile/notifications/seen')
    }
  }, [])

  const postHandler = async postId => {
    await getPost(postId)
    setShowPost(p => !p)
  }

  const { post } = props.post
  let youtubeUrl = post && post.url

  youtubeUrl && youtubeUrl.includes('https://www.youtube' || 'https://youtu.be')
    ? (youtubeUrl = post.url
        .replace(/youtu\.be/gi, 'www.youtube.com')
        .replace(/watch\?v=/gi, 'embed/')
        .replace(/&feature=www\.youtube\.com/gi, ''))
    : (youtubeUrl = null)

  return (
    <div>
      {showPost && post && (
        <ShowPost
          post={post}
          setShowPost={setShowPost}
          showPost={showPost}
          youtubeUrl={youtubeUrl}
        />
      )}
      <NotificationList
        notifications={notifications}
        postHandler={postHandler}
      />
    </div>
  )
}

Notifications.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(
  mapStateToProps,
  { getPost }
)(Notifications)
