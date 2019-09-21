import React from 'react'
import PropTypes from 'prop-types'

export default function PromoContent({
  user,
  profile,
  onDeleteBrand,
  onDeleteDjpool,
  onDeletePerk,
  onDeleteStore
}) {
  return user.isAdmin &&
    <>
      <div className='dashboard_ad_container'>
        <h3>DJ Pools</h3>
        <div>
        { profile.djpools.map(val => (
          <div key={val._id} className='ad_img_btn_container'>
            <img src={val.image} alt={val._id} />
            <br />
            <button 
              id='djpools_delete_btn'
              onClick={() => onDeleteDjpool(val._id) }>
                Delete
            </button>
          </div>
        ))} 
        </div>
      </div>
      
      <div className='dashboard_ad_container'>
        <h3>Certified Stores</h3>
        <div>
        { profile.stores.map(val => (
          <div key={val._id} className='ad_img_btn_container'>
            <img src={val.image} alt={val._id} />
            <br />
            <button 
              id='djpools_delete_btn'
              onClick={() => onDeleteStore(val._id) }>
                Delete
            </button>
          </div>
        ))} 
        </div>
      </div>
      <div className='dashboard_ad_container'>
        <h3>Perks</h3>
        <div>
        { profile.perks.map(val => (
          <div key={val._id} className='ad_img_btn_container'>
            <img src={val.image} alt={val._id} />
            <br />
            <button 
              id='djpools_delete_btn'
              onClick={() => onDeletePerk(val._id) }>
                Delete
            </button>
          </div>
        ))} 
        </div>
      </div>
      <div className='dashboard_ad_container'>
        <h3>Brands</h3>
        <div>
        { profile.brands.map(val => (
          <div key={val._id} className='ad_img_btn_container'>
            <img src={val.image} alt={val._id} />
            <br />
            <button 
              id='djpools_delete_btn'
              onClick={() => onDeleteBrand(val._id) }>
                Delete
            </button>
          </div>
        ))} 
        </div>
      </div>
    </>
}

PromoContent.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  onDeleteBrand: PropTypes.func.isRequired,
  onDeleteDjpool: PropTypes.func.isRequired,
  onDeletePerk: PropTypes.func.isRequired,
  onDeleteStore: PropTypes.func.isRequired
}