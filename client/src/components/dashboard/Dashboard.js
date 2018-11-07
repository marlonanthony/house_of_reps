import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux' 
import { Link } from 'react-router-dom'
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions'
import Spinner from '../common/Spinner'
import ProfileActions from './ProfileActions'
import Venues from './Venues'

import './Dashboard.css'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile()
  }

  onDeleteClick = e => {
    this.props.deleteAccount()
  }

  render() {
    const { user } = this.props.auth
    const { profile, loading } = this.props.profile

    let dashboardContent

    if(profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      // Check if logged in user has profile data
      if(Object.keys(profile).length > 0) {
        dashboardContent = (
          <div style={{ minHeight: '100vh' }}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Link 
                style={{textDecoration: 'none', color: 'rgb(55, 131, 194)', padding: '10px'}} 
                to={`/profile/${profile.handle}`} >{ user.name }
              </Link>
              <ProfileActions />
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Venues venues={profile.venues} />
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <button 
                onClick={ this.onDeleteClick } id="dashboard-delete-btn">Delete My Account
              </button>
            </div>
          </div>
        )
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="">{ user.name }</p>
            <p>You have not yet set up a profile, please add some info</p>
            <Link to='/create-profile' className=''>Create Profile</Link>
          </div>
        )
      }
    }

    return (
      <div id='dashboard'>
        { dashboardContent }
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth 
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)