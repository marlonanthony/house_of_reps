import React from 'react'
import { Link } from 'react-router-dom'

import ProfileActions from '../ProfileActions'

export default function HandleAndActions({ profile, user }) {
  return (
    <div className="handle_actions_container">
      <Link to={`/profile/${profile.handle}`}>@{profile.handle}</Link>
      <ProfileActions user={user} />
    </div>
  )
}
