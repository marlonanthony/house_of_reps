import React from 'react'
import { Link } from 'react-router-dom'
import Guest from '../../components/auth/Guest'
import './Landing.css'

const Landing = () => {
  const date = new Date()

  return (
    <main>
      <div className="fade-pic">
        <div className="dark-overlay">
          <div className="landing_content">
            <div>
              <h1>House of Reps</h1>
              <h6>Community of DJs by DJs for DJs</h6>
              <div className="landing_btn_container">
                <Link to="/login">
                  <button className="landing_buttons">Sign In</button>
                </Link>
                <Link to="/register">
                  <button className="landing_buttons">Sign Up</button>
                </Link>
                <Guest />
              </div>
            </div>
            <footer className="landing_footer">
              Copyright &copy; {date.getFullYear()} House of Reps
            </footer>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Landing
