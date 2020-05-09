import React from 'react'

export default function Footer() {
  const date = new Date()

  return (
    <div className="post-feed-footer">
      <footer>Copyright &copy; {date.getFullYear()} Senate DJs</footer>
    </div>
  )
}
