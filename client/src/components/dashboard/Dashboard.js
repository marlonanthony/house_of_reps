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
          <div>
            <div className='handle_actions_container'>
              <Link 
                style={{textDecoration: 'none', color: 'rgb(55, 131,194)', padding: '10px'}} 
                to={`/profile/${profile.handle}`} >@{ profile.handle }
              </Link>
              <ProfileActions profile={profile} />
            </div>

            { profile._id === "5bad9e76f3dd61183a0fec97" &&
              <>
                <div className='dashboard_ad_container'>
                  <h3>DJ Pools</h3>
                  <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', }}>
                  {profile.djpools.map(val => (
                    <div key={val._id} style={{padding: '20px'}}>
                      <img src={val.image} alt={val._id} style={{height: '100px', width: '100px', }} />
                      <br />
                      <button 
                        id='djpools_delete_btn'
                        onClick={ this.onDeleteDjpool.bind(this, val._id) }>
                          Delete
                      </button>
                    </div>
                  ))} 
                  </div>
                </div>
                
                <div className='dashboard_ad_container'>
                  <h3>Certified Stores</h3>
                  <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around',}}>
                  {profile.stores.map(val => (
                    <div key={val._id} style={{padding: '20px'}}>
                      <img src={val.image} alt={val._id} style={{height: '100px', width: '100px', }} />
                      <br />
                      <button 
                        id='djpools_delete_btn'
                        onClick={ this.onDeleteStore.bind(this, val._id) }>
                          Delete
                      </button>
                    </div>
                  ))} 
                  </div>
                </div>
                <div className='dashboard_ad_container'>
                  <h3>Perks</h3>
                  <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                  {profile.perks.map(val => (
                    <div key={val._id} style={{padding: '20px'}}>
                      <img src={val.image} alt={val._id} style={{height: '100px', width: '100px', }} />
                      <br />
                      <button 
                        id='djpools_delete_btn'
                        onClick={ this.onDeletePerk.bind(this, val._id) }>
                          Delete
                      </button>
                    </div>
                  ))} 
                  </div>
                </div>
                <div className='dashboard_ad_container'>
                  <h3>Brands</h3>
                  <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                  {profile.brands.map(val => (
                    <div key={val._id} style={{padding: '20px'}}>
                      <img src={val.image} alt={val._id} style={{height: '100px', width: '100px', }} />
                      <br />
                      <button 
                        id='djpools_delete_btn'
                        onClick={ this.onDeleteBrand.bind(this, val._id) }>
                          Delete
                      </button>
                    </div>
                  ))} 
                  </div>
                </div>
              </> 
            }
            
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', padding: '5px' }}>
              <Venues venues={profile.venues} />
            </div> 

            <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '20px', marginBottom: '50px'}}>
              <button 
                onClick={ this.onDeleteClick } id="dashboard-delete-btn" title='double-click to delete profile'>
                Delete My Account
              </button>
            </div>
          </div>
        )
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
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