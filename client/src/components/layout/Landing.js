import React, { Component } from 'react'

import ProfileCards from '../profile-cards/ProfileCards'
import './Landing.css'

class Landing extends Component {
  render() {
    return (
      <div>
        <div className='fade-pic pict'>
          <img
            style={{ width: '100vw', height: '93.5vh' }}
            src={require('../../img/dj.jpg')} 
            alt="Landing Pic"/>
        </div>
        <ProfileCards />
      </div>
      
    )
  }
}

export default Landing
