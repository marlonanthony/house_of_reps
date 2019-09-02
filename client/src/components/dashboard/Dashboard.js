import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux' 
import { Link } from 'react-router-dom'

import { 
  getCurrentProfile, 
  deleteAccount, 
  deleteDjpool, 
  deleteStore, 
  deletePerk, 
  deleteBrand 
} from '../../actions/profileActions'
import Spinner from '../common/Spinner'
import ProfileActions from './ProfileActions'
import Venues from './Venues'
import AdContent from './AdContent'
import './Dashboard.css'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile()
  }

  onDeleteClick = () => {
    this.props.deleteAccount()
  }

  onDeleteDjpool = id => {
    this.props.deleteDjpool(id) 
  }

  onDeleteStore = id => {
    this.props.deleteStore(id) 
  }

  onDeletePerk = id => {
    this.props.deletePerk(id) 
  }

  onDeleteBrand = id => {
    this.props.deleteBrand(id) 
  }

  render() {
    const { user } = this.props.auth
    const { profile, loading } = this.props.profile

    let dashboardContent

    if(profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      if(Object.keys(profile).length > 0) {
        dashboardContent = (
          <div style={{ textAlign: 'center'}}>
            <div className='handle_actions_container'>
              <Link to={`/profile/${profile.handle}`} >@{ profile.handle }</Link>
              <ProfileActions profile={profile} />
            </div>
            <AdContent 
              profile={profile} 
              onDeleteBrand={this.onDeleteBrand}
              onDeleteDjpool={this.onDeleteDjpool}
              onDeletePerk={this.onDeletePerk}
              onDeleteStore={this.onDeleteStore}
            />
            <Venues venues={profile.venues} />
            <button
              onClick={ this.onDeleteClick } 
              id="dashboard-delete-btn" 
              title='delete profile'>
              Delete My Account
            </button>
          </div>
        )
      } else {
        dashboardContent = (
          <div className='dashboard_no_profile'>
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
  deleteDjpool: PropTypes.func.isRequired,
  deleteStore: PropTypes.func.isRequired,
  deletePerk: PropTypes.func.isRequired,
  deleteBrand: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth, 
})

export default connect(mapStateToProps, { 
  getCurrentProfile, 
  deleteAccount, 
  deleteDjpool, 
  deleteStore, 
  deletePerk , 
  deleteBrand
})(Dashboard)