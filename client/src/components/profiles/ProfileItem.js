import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { Link } from 'react-router-dom' 
import isEmpty from '../../validation/is-empty'

import './ProfileItem.css'

class ProfileItem extends Component {
  render() {
    const { profile } = this.props


    return (
      <div 
        className='' 
        style={{ 
        display: 'inline-block', 
        marginRight: '25px', 
        // border: 'none',
        // borderRadius: '5px',
        minWidth: '250px',
        padding: '20px'
        }}>
        <div className='profile_item' style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <img 
              src={ profile.user.avatar } 
              alt={profile.user.name} 
              className=""
              style={{
                borderRadius: '50%',
                height: '100px',
                width: '100px'
              }} />
          </div>

          <div className="">
            <h3>{ profile.user.name }</h3>
            <p>
              {isEmpty(profile.stageName) ? null : (<span>{profile.stageName}</span>)}
            </p>
            <Link to={`/profile/${profile.handle}`} id='profile-item-link'>
              View Profile 
            </Link>
          </div>

        </div>
      </div>
    )
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem