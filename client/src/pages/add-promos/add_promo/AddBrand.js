import React from 'react'
import { connect } from 'react-redux'

import { addBrand } from '../../../actions/profileActions'
import AddPromo from './AddPromo'

function AddBrand({ addBrand }) {
  return <AddPromo title="Add Brand" action={addBrand} />
}

export default connect(
  null,
  { addBrand }
)(AddBrand)
