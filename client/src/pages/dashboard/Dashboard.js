import React, { useEffect } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux' 

import DashboardContent from '../../components/dashboard_content/DashboardContent'
import { getCurrentProfile } from '../../actions/profileActions'
import isEmpty from '../../validation/is-empty'
import './Dashboard.css'

const Dashboard = ({ auth, ...props}) => {

  useEffect(() => {
    if(isEmpty(props.profile.profile)) props.getCurrentProfile()
  }, [props.profile.profile])

  const { user } = auth
  const { profile, loading } = props.profile

  return (
    <DashboardContent 
      profile={ profile }
      loading={ loading }
      user={ user }
    />
  )
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth, 
})

export default connect(mapStateToProps, { 
  getCurrentProfile
})(Dashboard)