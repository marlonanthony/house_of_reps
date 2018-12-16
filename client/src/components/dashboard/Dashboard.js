import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux' 
import { Link } from 'react-router-dom'
import { getCurrentProfile, deleteAccount, deleteDjpool, deleteStore, deletePerk, deleteBrand } from '../../actions/profileActions'
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
      // Check if logged in user has profile data
      if(Object.keys(profile).length > 0) {
        dashboardContent = (
          <div style={{ minHeight: '100vh' }}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(0,0,0,0.6)', maxWidth: '600px', margin: 'auto'}}>
              <Link 
                style={{textDecoration: 'none', color: 'rgb(55, 131,194)', padding: '10px'}} 
                to={`/profile/${profile.handle}`} >@{ profile.handle }
              </Link>
              <ProfileActions />
              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                { profile.user._id === "5bad9df3f3dd61183a0fec96" ? (
                  <Link to="/add-djpool" style={{ padding: '10px', textDecoration: 'none', color: 'rgb(55, 131, 194)' }}>
                    <i className="fas fa-wrench" /> Add DJ Pool 
                  </Link>
                ) : null }
                { profile.user._id === "5bad9df3f3dd61183a0fec96" ? (
                  <Link to="/add-store" style={{ padding: '10px', textDecoration: 'none', color: 'rgb(55, 131, 194)' }}>
                    <i className='far fa-building' /> Add Certified Store
                  </Link>
                ) : null }
                { profile.user._id === "5bad9df3f3dd61183a0fec96" ? (
                  <Link to="/add-perk" style={{ padding: '10px', textDecoration: 'none', color: 'rgb(55, 131, 194)' }}>
                    <i className='fas fa-gift' /> Add Perk
                  </Link>
                ) : null }
                { profile.user._id === "5bad9df3f3dd61183a0fec96" ? (
                  <Link to="/add-brand" style={{ padding: '10px', textDecoration: 'none', color: 'rgb(55, 131, 194)' }}>
                    <i className='fas fa-gift' /> Add Brand
                  </Link>
                ) : null }
              </div>
            </div>

            
            {profile._id === "5bad9e76f3dd61183a0fec97" ? 
            <div style={{padding: '50px 10% 50px 10%'}}>
              <h3 style={{textAlign: 'center', padding: '10px', color: '#fff', background: 'rgba(0,0,0,0.5)', margin: 'auto', width: '100px', }}>DJ Pools</h3>
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
            </div> : null }

            {profile._id === "5bad9e76f3dd61183a0fec97" ? 
            <div style={{padding: '50px 10% 50px 10%'}}>
              <h3 style={{textAlign: 'center', padding: '10px', color: '#fff', background: 'rgba(0,0,0,0.5)', margin: 'auto', width: '150px',}}>Certified Stores</h3>
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
            </div> : null }

            {profile._id === "5bad9e76f3dd61183a0fec97" ? 
            <div style={{padding: '50px 10% 50px 10%'}}>
              <h3 style={{textAlign: 'center', padding: '10px', color: '#fff', background: 'rgba(0,0,0,0.5)', margin: 'auto', width: '100px',}}>Perks</h3>
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
            </div> : null }

            {profile._id === "5bad9e76f3dd61183a0fec97" ? 
            <div style={{padding: '50px 10% 50px 10%'}}>
              <h3 style={{textAlign: 'center', padding: '10px', color: '#fff', background: 'rgba(0,0,0,0.5)', margin: 'auto', width: '100px',}}>Brands</h3>
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
            </div> : null }

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', padding: '5px' }}>
              <Venues venues={profile.venues} />
            </div> 

            <div style={{display: 'flex', justifyContent: 'center'}}>
              <button 
                onDoubleClick={ this.onDeleteClick } id="dashboard-delete-btn" title='double-click to delete profile'>
                Delete My Account
              </button>
            </div>
          </div>
        )
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
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

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, deleteDjpool, deleteStore, deletePerk , deleteBrand})(Dashboard)