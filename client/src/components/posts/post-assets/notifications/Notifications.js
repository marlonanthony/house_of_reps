import React, { Component } from 'react'
import { connect } from 'react-redux' 
import axios from 'axios'

import { getPost } from '../../../../actions/postActions'
import ShowPost from './ShowPost'
import NotificationList from './NotificationList'
import './Notifications.css'

class Notifications extends Component {

  state = {
    notifications: [],
    showPost: false, 
  }

  componentDidMount() {
    axios.get('/api/profile/notifications') 
    .then(res => {
      this.setState({ notifications: res.data })
    })
  }

  postHandler = (postId) => {
    this.props.getPost(postId)
    this.setState(prevState => ({ showPost: !prevState.showPost }))
  }

  modalToggle = () => {
    this.setState(prevState => ({ showPost: !prevState.showPost }))
  }

  componentWillUnmount() {
    axios.post('/api/profile/notifications/seen')
  }

  render() {
    const { post } = this.props.post
    let youtubeUrl = post && post.url
    
    youtubeUrl && youtubeUrl.includes('https://www.youtube' || 'https://youtu.be') 
      ? youtubeUrl = post.url.replace(/youtu\.be/gi, 'www.youtube.com')
                             .replace(/watch\?v=/gi, 'embed/')
                             .replace(/&feature=www\.youtube\.com/gi, '')
      : youtubeUrl = null 
      
    return (
      <div>
        { this.state.showPost && post &&
          <ShowPost 
            post={post}
            modalToggle={this.modalToggle} 
            showPost={this.showPost}
            youtubeUrl={youtubeUrl}
          />
        }
        { this.state.notifications &&
          <NotificationList 
            notifications={this.state.notifications} 
            postHandler={this.postHandler}
            modalToggle={this.modalToggle}
          />
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { getPost  })(Notifications)