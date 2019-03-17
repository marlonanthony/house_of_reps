import React, { Component } from 'react'
import { connect } from 'react-redux' 

class Notifications extends Component {
  render() {
    return (
      <div>
        { this.props.profile.profile && 
        <div style={{ color: 'rgb(55, 131, 194)', textAlign: 'center' }}>
          { this.props.profile.profile.notifications.map((val, i) => 
            <div style={{padding: 10}} key={val._id}>
              <p>{i+1}. <span style={{color:'#999'}}>{val.message}</span></p>
            </div>)
          }
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
