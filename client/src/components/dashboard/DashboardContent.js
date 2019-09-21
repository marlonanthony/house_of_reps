import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import ProfileActions from './ProfileActions'
import Venues from './Venues'
import PromoContent from './PromoContent'

export default function DashboardContent({
  profile,
  loading,
  user,
  onDeleteBrand,
  onDeleteDjpool,
  onDeletePerk,
  onDeleteStore,
  onDeleteVenue,
  onDeleteClick
}) {
  let dashboardContent

  if(!profile|| loading) dashboardContent = null
  else {
    if(Object.keys(profile).length) {
      dashboardContent = (
        <div style={{ textAlign: 'center'}}>
          <div className='handle_actions_container'>
            <Link to={`/profile/${profile.handle}`} >@{ profile.handle }</Link>
            <ProfileActions user={user} />
          </div>
          <PromoContent
            user={user}
            profile={profile} 
            onDeleteBrand={onDeleteBrand}
            onDeleteDjpool={onDeleteDjpool}
            onDeletePerk={onDeletePerk}
            onDeleteStore={onDeleteStore}
          />
          <Venues venues={profile.venues} onDeleteVenue={onDeleteVenue} />
          <button
            onClick={ onDeleteClick } 
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
          <Link to='/create-profile'>Create Profile</Link>
        </div>
      )
    }
  }

  return <div id='dashboard'>{dashboardContent}</div>
}


DashboardContent.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  onDeleteVenue: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onDeleteDjpool: PropTypes.func.isRequired,
  onDeleteStore: PropTypes.func.isRequired,
  onDeletePerk: PropTypes.func.isRequired,
  onDeleteBrand: PropTypes.func.isRequired,
  profile: PropTypes.object
}