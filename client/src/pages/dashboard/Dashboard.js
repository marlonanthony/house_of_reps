import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import DashboardContent from '../../components/dashboard_content/DashboardContent'
import { getCurrentProfile } from '../../actions/profileActions'
import { getPromos } from '../../actions/promoActions'
import './Dashboard.css'
import Spinner from '../../components/common/Spinner'

const Dashboard = ({ auth, getCurrentProfile, getPromos, promo, ...props }) => {
  useEffect(() => {
    getCurrentProfile()
    getPromos()
  }, [])

  const { user } = auth
  const { profile, loading } = props.profile

  if (props.profile && loading) return <Spinner />

  return (
    profile && <DashboardContent profile={profile} user={user} promo={promo} />
  )
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  promo: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  promo: state.promo
})

export default connect(
  mapStateToProps,
  { getCurrentProfile, getPromos }
)(Dashboard)
