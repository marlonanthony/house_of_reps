import React, { useEffect } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux' 
import { withRouter } from 'react-router-dom'
import { loginUser } from '../../actions/authActions'

const Guest = ({ auth, loginUser, getCurrentProfile, ...props }) => {

  useEffect(() => {
    if(auth.isAuthenticated) {
      props.history.push('/login')
    }
  }, [auth.isAuthenticated])

  const onSubmitHandler = async e => {
    e.preventDefault() 
    const userData = {
      email: 'anthonysojo@gmail.com',
      password: '123456'
    }
    loginUser(userData)
  }

  return (
    <>
      <button className='landing_buttons' onClick={onSubmitHandler}>
        Guest
      </button>
    </>
  )
}

Guest.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { loginUser })(withRouter(Guest))