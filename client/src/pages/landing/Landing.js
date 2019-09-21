import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux'

import { loginUser } from '../../actions/authActions' 
import './Landing.css'

const Landing = ({ auth, loginUser, errors, ...props }) => {
  useEffect(() => {
    if(auth.isAuthenticated) {
      props.history.push('/feed')
    }
  }, [auth])

  return (
    <main>
      <div className='fade-pic'>
        <div className="dark-overlay">
          <div className="landing_content">
            <div>
              <h1>House of Reps</h1>
              <h6>Community of DJs by DJs for DJs</h6>
              <Link to='/login'>
                <button className='landing_buttons'>Sign In</button>
              </Link>
              <Link to='/register'>
                <button className='landing_buttons'>Sign Up</button>
              </Link> 
            </div>
            <footer className='landing_footer'>
              Copyright &copy; 2019 House of Reps
            </footer>
          </div>
        </div>
      </div>
    </main>
  )
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(mapStateToProps, { loginUser })(Landing)
