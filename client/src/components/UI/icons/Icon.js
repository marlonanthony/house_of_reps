import React from 'react'
import './Icon.css'

export default function Icon({ toggleIcon, icon, title }) {
  return (
    <i className={`post_icon ${icon}`} onClick={toggleIcon} title={title} />
  )
}
