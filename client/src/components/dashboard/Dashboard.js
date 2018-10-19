import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux' 
import { Link } from 'react-router-dom'
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions'
import Spinner from '../common/Spinner'
import ProfileActions from './ProfileActions'
import Venues from './Venues'

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
          <div>
            <p className="">
              Welcome <Link to={`/profile/${profile.handle}`} >{ user.name }</Link>
            </p>
            <ProfileActions />
            <Venues venues={profile.venues} />
            <div style={{ marginBottom: '60px' }}/>
            <button onClick={ this.onDeleteClick } className="">Delete My Account</button>
          </div>
        )
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="">Welcome { user.name }</p>
            <p>You have not yet set up a profile, please add some info</p>
            <Link to='/create-profile' className=''>Create Profile</Link>
          </div>
        )
      }
    }

    return (
      <div className='dashboard'>
        <div className="">
          <div className="">
            <div className="">
              <h1 className=''>Dashboard</h1>
              { dashboardContent }
            </div>
          </div>
        </div>
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