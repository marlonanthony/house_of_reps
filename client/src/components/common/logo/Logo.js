import React from 'react'
import './Logo.css'

export default function Logo() {
  return (
    <div id="logo-div">
      <img
        id="logo"
        src={require('../../../img/senate_blue_vectorized_500.png')}
        alt="logo"
      />
    </div>
  )
}
