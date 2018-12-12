import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types' 
import Spinner from '../common/Spinner'
// import ProfileItem from './ProfileItem'
import ProfileHighlights from './ProfileHighlights'
import { getProfiles } from '../../actions/profileActions'
// import background from '../../img/banner3.jpg'

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
          // <ProfileItem key={profile._id} profile={profile} />
          <ProfileHighlights key={profile._id} profile={profile} />
        ))
      } else {
        profileItems = <h4>No profiles found...</h4>
      }
    

    return (
      // <div className='profiles'>
      <div style={{
        // backgroundImage: `url(${background})`,
        // backgroundSize: 'cover',
        // backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'center',
        // minHeight: '100vh',
      }}>
        <div 
          style={{
            // paddingTop: '80px', 
            // background: 'rgba(0,0,0,0.0)', 
            // minHeight: `100vh - ${'80px'}`
          }}>
            { profileItems }
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