import React, { Component } from 'react'

import './ProfileCards.css'

class ProfileCards extends Component {
  render() {
    return (
      <div className='profile'>
        <div className='profile-card'>
          <img 
            style={{ 
              height: '150px', 
              width: '150px', 
              margin: '5%',
              borderRadius: '50%', 
              border: '8px solid hsl(190, 51%, 91%)'
            }}
            src="https://github.com/marlonanthony/portfolio/blob/master/images/profile.png?raw=true" 
            alt="Profile Pic"/>
          <h3>Marlon Decosta</h3>
          <p>Edit Profile</p>
          <p>DJ Pickles</p>
        </div>
      </div>
      
    )
  }
}

export default ProfileCards