import React from 'react'

export default function AdContent(props) {
  return (
    props.profile._id === "5bad9e76f3dd61183a0fec97" &&
    <>
      <div className='dashboard_ad_container'>
        <h3>DJ Pools</h3>
        <div>
        { props.profile.djpools.map(val => (
          <div key={val._id} className='ad_img_btn_container'>
            <img src={val.image} alt={val._id} />
            <br />
            <button 
              id='djpools_delete_btn'
              onClick={() => props.onDeleteDjpool(val._id) }>
                Delete
            </button>
          </div>
        ))} 
        </div>
      </div>
      
      <div className='dashboard_ad_container'>
        <h3>Certified Stores</h3>
        <div>
        { props.profile.stores.map(val => (
          <div key={val._id} className='ad_img_btn_container'>
            <img src={val.image} alt={val._id} />
            <br />
            <button 
              id='djpools_delete_btn'
              onClick={() => props.onDeleteStore(val._id) }>
                Delete
            </button>
          </div>
        ))} 
        </div>
      </div>
      <div className='dashboard_ad_container'>
        <h3>Perks</h3>
        <div>
        { props.profile.perks.map(val => (
          <div key={val._id} className='ad_img_btn_container'>
            <img src={val.image} alt={val._id} />
            <br />
            <button 
              id='djpools_delete_btn'
              onClick={() => props.onDeletePerk(val._id) }>
                Delete
            </button>
          </div>
        ))} 
        </div>
      </div>
      <div className='dashboard_ad_container'>
        <h3>Brands</h3>
        <div>
        { props.profile.brands.map(val => (
          <div key={val._id} className='ad_img_btn_container'>
            <img src={val.image} alt={val._id} />
            <br />
            <button 
              id='djpools_delete_btn'
              onClick={() => props.onDeleteBrand(val._id) }>
                Delete
            </button>
          </div>
        ))} 
        </div>
      </div>
    </>
  )
}
