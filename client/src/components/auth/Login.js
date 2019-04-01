import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux' 
import { withRouter } from 'react-router-dom'
import { loginUser } from '../../actions/authActions'
import Input from '../common/inputs/Input'
import './Login.css'

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  }

  // componentWillUnmount() {
  //   if(this.props.auth.isAuthenticated) {
  //     this.props.history.push('/feed')
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard') 
    }

    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmitHandler = e => {
    e.preventDefault() 
    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(userData) 
    // this.props.history.push('/dashboard') 
  }

  render() {
    const { errors } = this.state 

    return (
      <div className='login'>
        <h2 style={{ textAlign: 'center', paddingTop: '60px' }}>Log In</h2>
        <p style={{ textAlign: 'center' }}>Sign in to your account</p>
        <div id='login-content'>
          <form onSubmit={ this.onSubmitHandler }>
            <Input 
              placeholder='Email Address'
              name='email'
              type='email'
              value={ this.state.email }
              onChange={ this.onChangeHandler }
              error={ errors.email }
            />
            <Input 
              placeholder='Password'
              name='password'
              type="password"
              value={ this.state.password }
              onChange={ this.onChangeHandler }
              error={ errors.password }
            />
            <div className='login-page-button-container'>
              <input type="submit" id='login-page-button' title='submit' />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(withRouter(Login))
