import React from 'react'
import './Logo.css'

export default function Logo() {
  return (
    <div id="logo-div">
      <img id="logo" src={require('../../../img/logo-lg.png')} alt="logo" />
    </div>
  )
}
