import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types' 
import Spinner from '../common/Spinner'
import ProfileItem from './ProfileItem'
// import ProfileHighlights from './ProfileHighlights'
import { getProfiles } from '../../actions/profileActions'
// import background from 'http://outdoor.lv/wp-content/uploads/2018/10/vIjpM9.jpg'

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles()
  }

  render() {
    const { profiles, loading } = this.props.profile
    let profileItems

    if(profiles === null || loading) {
      profileItems = <Spinner />
    } 
      else if(profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ))
      } else {
        profileItems = <h4>No profiles found...</h4>
      }
    

    return (
      <div >
        <div style={{
          backgroundImage: `url(http://outdoor.lv/wp-content/uploads/2018/10/vIjpM9.jpg)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        }}>
          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              padding: '100px 5px 20px 5px',
              alignItems: 'center'
              
            }}>
              { profileItems }
          </div>
        </div>
      </div>
    )
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  loading: state.loading
})

export default connect(mapStateToProps, { getProfiles })(Profiles) 