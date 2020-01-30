import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { deleteAccount } from '../../../actions/profileActions'

function DeleteProfileBtn({ deleteAccount }) {
  return (
    <button
      onClick={deleteAccount}
      id="dashboard-delete-btn"
      title="delete profile"
    >
      Delete My Account
    </button>
  )
}

DeleteProfileBtn.propTypes = {
  deleteAccount: PropTypes.func.isRequired
}

export default connect(
  null,
  { deleteAccount }
)(DeleteProfileBtn)
