import React, { Component } from 'react'
import { connect } from 'react-redux' 
import './Notifications.css'

class Notifications extends Component {
  render() {
    return (
      <div>
        { this.props.profile.profile && 
          <div style={{ color: 'rgb(55, 131, 194)', marginTop: 100 }}>
            { this.props.profile.profile.notifications.map(notification => 
              <div className='notifications_container' key={notification._id}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  { notification.avatar && <img src={notification.avatar} style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 10 }} />}
                  { notification.message && <p><span style={{color:'#999'}}>{notification.message}</span></p> }
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  { notification.postText && <p>{ notification.postText.length >= 47 ? notification.postText.slice(0, 50) + '...' : notification.postText }</p> }
                  { notification.postImage && <img src={notification.postImage} style={{ width: 30, height: 30, marginLeft: 10 }} />}
                </div>
              </div>
            ).reverse()}
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth 
})

export default connect(mapStateToProps)(Notifications)
