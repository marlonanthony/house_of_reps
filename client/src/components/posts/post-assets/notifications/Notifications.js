import React, { Component } from 'react'
import { connect } from 'react-redux' 
import Moment from 'react-moment' 
import './Notifications.css'

class Notifications extends Component {
  render() {
    //   31, 449, 600, 000 ms === 1 Year
    //    2, 592, 000, 000 ms === 1 Month (30 Days)
    //       604, 800, 000 ms === 1 Week
    //        86, 400, 000 ms === 1 Day
    //         3, 600, 000 ms === 1 Hour
    //             60, 000 ms === 1 minute 
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
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  { notification.message && notification.message.includes('liked') 
                    ? <i className='fas fa-thumbs-up icons likespopupicon'></i>
                    : null
                  }
                  { notification.date && (
                    <p>{ notification.date && Math.abs(new Date(notification.date) - new Date()) > 259200000 
                      ?  <Moment format='ddd, ll LT'>{notification.date}</Moment>
                      : Math.abs(new Date(notification.date) - new Date()) > 172800000 
                      ? '2 days ago'
                      : Math.abs(new Date(notification.date) - new Date()) > 86400000
                      ? 'yesterday'
                      : Math.abs(new Date(notification.date) - new Date()) > 82800000
                      ? '23 hours ago'
                      : Math.abs(new Date(notification.date) - new Date()) > 79200000
                      ? '22 hours ago'
                      : Math.abs(new Date(notification.date) - new Date()) > 75600000
                      ? '21 hours ago'
                      : Math.abs(new Date(notification.date) - new Date()) > 72000000
                      ? '20 hours ago'
                      : Math.abs(new Date(notification.date) - new Date()) > 68400000
                      ? '19 hours ago'
                      : Math.abs(new Date(notification.date) - new Date()) > 64800000
                      ? '18 hours ago'
                      : Math.abs(new Date(notification.date) - new Date()) > 61200000
                      ? '17 hours ago'
                      : Math.abs(new Date(notification.date) - new Date()) > 57600000
                      ? '16 hours ago'
                      : Math.abs(new Date(notification.date) - new Date()) > 54000000
                      ? '15 hours ago'
                      : Math.abs(new Date(notification.date) - new Date()) > 50400000
                      ? '14 hours ago'
                      : Math.abs(new Date(notification.date) - new Date()) > 46800000
                      ? '13 hours ago'
                      : Math.abs(new Date(notification.date) - new Date()) > 43200000
                      ? '12 hours ago'
                      : Math.abs(new Date(notification.date) - new Date()) > 39600000
                      ? '11 hours ago'
                      : Math.abs(new Date(notification.date) - new Date()) > 36000000
                      ? '10 hours ago'
                      : Math.abs(new Date(notification.date) - new Date()) > 32400000
                      ? '9 hours ago'
                      : Math.abs(new Date(notification.date) - new Date()) > 28800000
                      ? '8 hours ago'
                      : Math.abs(new Date(notification.date) - new Date()) > 25200000
                      ? '7 hours ago'
                      : Math.abs(new Date(notification.date) - new Date()) > 21600000
                      ? '6 hours ago'
                      : Math.abs(new Date(notification.date) - new Date()) > 18000000
                      ? '5 hours ago'
                      : Math.abs(new Date(notification.date) - new Date()) > 14400000
                      ? '4 hours ago'
                      : Math.abs(new Date(notification.date) - new Date()) > 10800000
                      ? '3 hours ago'
                      : Math.abs(new Date(notification.date) - new Date()) > 7200000
                      ? '2 hours ago'
                      : Math.abs(new Date(notification.date) - new Date()) > 3600000
                      ? '1 hour ago'
                      : Math.abs(new Date(notification.date) - new Date()) >= 60000
                      ? '1 minute ago'
                      : Math.round(Math.abs(new Date(notification.date) - new Date()) / 1000) + ' seconds ago'
                    }</p>
                  ) }
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
