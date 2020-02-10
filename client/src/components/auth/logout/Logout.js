import React from 'react'
import './Logout.css'

export default function Logout({ user }) {
  return (
    <div className="logout-div">
      <img className="logout-avatar" src={user.avatar} alt={user.name} />
      Logout
    </div>
  )
}
