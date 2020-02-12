import React from 'react'
import { connect } from 'react-redux'

import { addPerk } from '../../actions/profileActions'
import AddPromo from './AddPromo'

function AddPerk({ addPerk }) {
  return <AddPromo title="Add Perk" action={addPerk} />
}

export default connect(
  null,
  { addPerk }
)(AddPerk)
