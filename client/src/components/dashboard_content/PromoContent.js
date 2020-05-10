import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  deleteDjpool,
  deleteStore,
  deletePerk,
  deleteBrand
} from '../../actions/profileActions'

const PromoContent = ({
  user,
  promo,
  deleteDjpool,
  deleteStore,
  deletePerk,
  deleteBrand
}) =>
  user.isAdmin && (
    <>
      <div className="dashboard_ad_container">
        <h3>DJ Pools</h3>
        <div>
          {promo &&
            promo.promos &&
            promo.promos.map(
              val =>
                val.type === 'djpools' && (
                  <div key={val._id} className="ad_img_btn_container">
                    <img src={val.image} alt={val._id} />
                    <br />
                    <button
                      id="djpools_delete_btn"
                      onClick={() => deleteDjpool(val._id)}
                    >
                      Delete
                    </button>
                  </div>
                )
            )}
        </div>
      </div>

      <div className="dashboard_ad_container">
        <h3>Certified Stores</h3>
        <div>
          {promo &&
            promo.promos &&
            promo.promos.map(
              val =>
                val.type === 'stores' && (
                  <div key={val._id} className="ad_img_btn_container">
                    <img src={val.image} alt={val._id} />
                    <br />
                    <button
                      id="djpools_delete_btn"
                      onClick={() => deleteStore(val._id)}
                    >
                      Delete
                    </button>
                  </div>
                )
            )}
        </div>
      </div>
      <div className="dashboard_ad_container">
        <h3>Perks</h3>
        <div>
          {promo &&
            promo.promos &&
            promo.promos.map(
              val =>
                val.type === 'perks' && (
                  <div key={val._id} className="ad_img_btn_container">
                    <img src={val.image} alt={val._id} />
                    <br />
                    <button
                      id="djpools_delete_btn"
                      onClick={() => deletePerk(val._id)}
                    >
                      Delete
                    </button>
                  </div>
                )
            )}
        </div>
      </div>
      <div className="dashboard_ad_container">
        <h3>Brands</h3>
        <div>
          {promo &&
            promo.promos &&
            promo.promos.map(
              val =>
                val.type === 'brands' && (
                  <div key={val._id} className="ad_img_btn_container">
                    <img src={val.image} alt={val._id} />
                    <br />
                    <button
                      id="djpools_delete_btn"
                      onClick={() => deleteBrand(val._id)}
                    >
                      Delete
                    </button>
                  </div>
                )
            )}
        </div>
      </div>
    </>
  )

PromoContent.propTypes = {
  user: PropTypes.object.isRequired,
  deleteBrand: PropTypes.func.isRequired,
  deleteDjpool: PropTypes.func.isRequired,
  deletePerk: PropTypes.func.isRequired,
  deleteStore: PropTypes.func.isRequired,
  promo: PropTypes.object.isRequired
}

export default connect(
  null,
  {
    deleteDjpool,
    deleteStore,
    deletePerk,
    deleteBrand
  }
)(PromoContent)
