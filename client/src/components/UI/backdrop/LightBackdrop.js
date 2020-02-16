import React from 'react'

import './LightBackdrop.css'

const LightBackdrop = ({ show, clicked }) =>
  show ? <div className="light-backdrop" onClick={clicked}></div> : null

export default LightBackdrop
