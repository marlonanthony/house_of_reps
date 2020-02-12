import React from 'react'
import { connect } from 'react-redux'

import { addDjpool } from '../../actions/profileActions'
import AddPromo from './AddPromo'

function AddPool({ addDjpool }) {
  return <AddPromo title="Add DJ Pool" action={addDjpool} />
}

export default connect(
  null,
  { addDjpool }
)(AddPool)
