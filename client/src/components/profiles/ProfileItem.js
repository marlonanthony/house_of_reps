import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { Link } from 'react-router-dom' 
import isEmpty from '../../validation/is-empty'

class ProfileItem extends Component {
  render() {
    const { profile } = this.props


    return (
      <div className='card card-body bg-light mb-3'>
        <div className="row">
          <div>
            <img src={ profile.user.avatar } alt={profile.user.name} className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4 col-8 mr-auto">
            <h3>{ profile.user.name }</h3>
            <p>
              {isEmpty(profile.stageName) ? null : (<span>{profile.stageName}</span>)}
            </p>
            {console.log(profile)}
            <Link to={`/profile/${profile.handle}`} className='btn btn-info'>
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