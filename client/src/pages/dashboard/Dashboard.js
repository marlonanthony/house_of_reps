import React, { useEffect } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux' 

import DashboardContent from '../../components/dashboard_content/DashboardContent'
import { 
  getCurrentProfile, 
  deleteAccount, 
  deleteDjpool, 
  deleteStore, 
  deletePerk, 
  deleteBrand,
  deleteVenue
} from '../../actions/profileActions'
import './Dashboard.css'

const Dashboard = ({ auth, ...props}) => {

  useEffect(() => {
    if(!props.profile.profile) props.getCurrentProfile()
  }, [props.profile.profile, props.getCurrentProfile])

  const onDeleteClick = () => {
    props.deleteAccount()
  }

  const onDeleteDjpool = id => {
    props.deleteDjpool(id) 
  }

  const onDeleteStore = id => {
    props.deleteStore(id) 
  }

  const onDeletePerk = id => {
    props.deletePerk(id) 
  }

  const onDeleteBrand = id => {
    props.deleteBrand(id) 
  }

  const onDeleteVenue = id => {
    props.deleteVenue(id) 
  }

  const { user } = auth
  const { profile, loading } = props.profile



  return (
    <DashboardContent 
      profile={ profile }
      loading={ loading }
      user={ user }
      onDeleteBrand={ onDeleteBrand }
      onDeleteDjpool={ onDeleteDjpool }
      onDeletePerk={ onDeletePerk }
      onDeleteStore={ onDeleteStore }
      onDeleteVenue={ onDeleteVenue }
      onDeleteClick={ onDeleteClick }
    />
  )
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
  deleteBrand,
  deleteVenue
})(Dashboard)