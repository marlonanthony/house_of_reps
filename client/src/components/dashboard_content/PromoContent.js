import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deletePromo } from '../../actions/promoActions'

const PromoContent = ({ user, promo, deletePromo }) =>
  user.isAdmin && (
    <>
      <div className="dashboard_ad_container">
        <h3>DJ Pools</h3>
        <div>
          {promo &&
            promo.map(
              val =>
                val.type === 'djpools' && (
                  <div key={val._id} className="ad_img_btn_container">
                    <img src={val.image} alt={val._id} />
                    <br />
                    <button
                      id="djpools_delete_btn"
                      onClick={() => deletePromo(val._id)}
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
            promo.map(
              val =>
                val.type === 'stores' && (
                  <div key={val._id} className="ad_img_btn_container">
                    <img src={val.image} alt={val._id} />
                    <br />
                    <button
                      id="djpools_delete_btn"
                      onClick={() => deletePromo(val._id)}
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
            promo.map(
              val =>
                val.type === 'perks' && (
                  <div key={val._id} className="ad_img_btn_container">
                    <img src={val.image} alt={val._id} />
                    <br />
                    <button
                      id="djpools_delete_btn"
                      onClick={() => deletePromo(val._id)}
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
            promo.map(
              val =>
                val.type === 'brands' && (
                  <div key={val._id} className="ad_img_btn_container">
                    <img src={val.image} alt={val._id} />
                    <br />
                    <button
                      id="djpools_delete_btn"
                      onClick={() => deletePromo(val._id)}
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
  promo: PropTypes.array.isRequired,
  deletePromo: PropTypes.func.isRequired
}

export default connect(
  null,
  {
    deletePromo
  }
)(PromoContent)
