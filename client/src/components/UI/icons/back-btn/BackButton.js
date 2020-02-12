import React from 'react'
import { withRouter } from 'react-router-dom'
import './BackButton.css'
function BackButton({ history }) {
  return (
    <i
      onClick={history.goBack}
      className="fas fa-arrow-alt-circle-left back-btn"
      alt="back-button"
    />
  )
}
export default withRouter(BackButton)
