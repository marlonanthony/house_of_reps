import React from 'react'
import './Arrow.css'

const Arrow = ({ direction, styleClass, clickFunction, glyph }) => (
  <div className={`${styleClass} ${direction}`} onClick={clickFunction}>
    {glyph}
  </div>
)

export default Arrow
