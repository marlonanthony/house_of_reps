import React from 'react'
import { connect } from 'react-redux'

import { addStore } from '../../../actions/profileActions'
import AddPromo from './AddPromo'

function AddStore({ addStore }) {
  return <AddPromo title="Add Store" action={addStore} />
}

export default connect(
  null,
  { addStore }
)(AddStore)
