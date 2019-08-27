import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux' 
import Moment from 'react-moment' 
import axios from 'axios'

import { getPost } from '../../../../actions/postActions'
import ShowPost from './ShowPost'
import './Notifications.css'

class Notifications extends Component {

  state = {
    notifications: [],
    showPost: false, 
  }

  componentDidMount() {
    document.addEventListener('click', this.onOutsideClick, true) 
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

  onOutsideClick = (e) => {
    const domNode = ReactDOM.findDOMNode(this) 
    if(!domNode || !domNode.contains(e.target)) {
      this.setState({ showPost: false })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onOutsideClick, true)
    axios.post('/api/profile/notifications/seen')
  }

  render() {
    const { post } = this.props.post
    let youtubeUrl = post.url
    
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
          <div className='notifications'>
            <h1 id='notifications_header'>Notifications</h1>
            { this.state.notifications.map(notification => (
              <div className={!notification.seen ? 'new_notification' : 'notifications_container' } key={notification._id}>
                <div className='notification_avatar_and_message_container'>
                  { notification.avatar && <img src={notification.avatar} alt='avatar' className='notification_user_avatar' />}
                  { notification.message && <p><span className='notification_message'>{notification.message}</span></p> }
                </div>
                <div className='notification_post_content' onClick={this.postHandler.bind(this, notification.postId)}>
                  { notification.postText && <p>{ notification.postText.length >= 47 ? notification.postText.slice(0, 50) + '...' : notification.postText }</p> }
                  { notification.postImage && <img src={notification.postImage} alt='post img' className='notification_post_content_image' />}
                  { notification.highlight && <iframe title='youtube' className='notification_highlights' src={notification.highlight.video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe> }
                  { !notification.highlight && notification.video && <iframe title='youtube' className='notification_highlights' src={notification.video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe> }
                </div>
                <div className='notification_icons'>
                  { notification.message && notification.message.includes('liked') 
                    ? <i className='fas fa-thumbs-up icons'></i>
                    : notification.message && notification.message.includes('commented') 
                    ? <i className='fas fa-comment icons' id='comment'/>                     
                    : null
                  }
                  { notification.highlight && <p style={{fontSize: 12}}>{ notification.highlight.likes && notification.highlight.likes.length }</p> }
                  { notification.post && <p style={{fontSize: 12}}>{ notification.post.likes && notification.post.likes.length }</p> }
                  { notification.comment && <p style={{fontSize: 12}}>{ notification.comment.likes && notification.comment.likes.length }</p> }
                  { notification.date && (
                    <p className='notification_date'>{ notification.date && Math.abs(new Date(notification.date) - new Date()) > 259200000 
                      ?  <Moment format='ddd, ll LT'>{notification.date}</Moment>
                      : Math.abs(new Date(notification.date) - new Date()) > 172800000 
                      ? '2 days ago'
                      : Math.abs(new Date(notification.date) - new Date()) >= 86400000
                      ? 'yesterday'
                      : Math.abs(new Date(notification.date) - new Date()) > 7200000
                      ? Math.floor(Math.abs(new Date(notification.date) - new Date()) / 3600000) + ' hours ago'
                      : Math.abs(new Date(notification.date) - new Date()) > 3600000
                      ? '1 hour ago'
                      : Math.abs(new Date(notification.date) - new Date()) >= 60000
                      ? Math.floor(Math.abs(new Date(notification.date) - new Date()) / 60000) + ' minutes ago'
                      : Math.floor(Math.abs(new Date(notification.date) - new Date()) / 1000) + ' seconds ago'
                    }</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { getPost  })(Notifications)

    //   31, 449, 600, 000 ms === 1 Year
    //    2, 592, 000, 000 ms === 1 Month (30 Days)
    //       604, 800, 000 ms === 1 Week
    //        86, 400, 000 ms === 1 Day
    //         3, 600, 000 ms === 1 Hour
    //             60, 000 ms === 1 minute 