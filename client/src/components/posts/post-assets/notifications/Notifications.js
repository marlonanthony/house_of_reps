import React, { Component } from 'react'
import { connect } from 'react-redux' 
import Moment from 'react-moment' 
import axios from 'axios'
import './Notifications.css'

class Notifications extends Component {

  state = {
    notifications: []
  }

  componentDidMount() {
    axios.get('/api/profile/notifications') 
    .then(res => {
      this.setState({ notifications: res.data })
    })
  }

  componentWillUnmount() {
    axios.post('/api/profile/notifications')
  }

  render() {
    //   31, 449, 600, 000 ms === 1 Year
    //    2, 592, 000, 000 ms === 1 Month (30 Days)
    //       604, 800, 000 ms === 1 Week
    //        86, 400, 000 ms === 1 Day
    //         3, 600, 000 ms === 1 Hour
    //             60, 000 ms === 1 minute 
    
    return (
      <div>
        { this.state.notifications && 
          <div style={{ color: 'rgb(55, 131, 194)', marginTop: 100 }}>
            { this.state.notifications.map(notification => (
              <div className={!notification.seen ? 'notifications_container seen' : 'notifications_container' } key={notification._id}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  { notification.avatar && <img src={notification.avatar} style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 10 }} />}
                  { notification.message && <p><span style={{color:'#999'}}>{notification.message}</span></p> }
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  { notification.postText && <p>{ notification.postText.length >= 47 ? notification.postText.slice(0, 50) + '...' : notification.postText }</p> }
                  { notification.postImage && <img src={notification.postImage} style={{ width: 30, height: 30, marginLeft: 10 }} />}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  { notification.message && notification.message.includes('liked') 
                    ? <i className='fas fa-thumbs-up icons likespopupicon'></i>
                    : notification.message && notification.message.includes('commented') 
                    ? <i className='fas fa-comment icons' id='comment'/>
                    : null
                  }
                  { notification.date && (
                    <p>{ notification.date && Math.abs(new Date(notification.date) - new Date()) > 259200000 
                      ?  <Moment format='ddd, ll LT'>{notification.date}</Moment>
                      : Math.abs(new Date(notification.date) - new Date()) > 172800000 
                      ? '2 days ago'
                      : Math.abs(new Date(notification.date) - new Date()) >= 86400000
                      ? 'yesterday'
                      : Math.abs(new Date(notification.date) - new Date()) > 3600000
                      ? Math.floor(Math.abs(new Date(notification.date) - new Date()) / 3600000) + ' hours ago'
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

// const mapStateToProps = state => ({
//   profile: state.profile
//   auth: state.auth 
// })

export default connect(null)(Notifications)
