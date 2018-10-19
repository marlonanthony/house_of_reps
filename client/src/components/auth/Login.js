import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux' 
import { loginUser } from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'
import './Login.css'

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/feed')
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/feed') 
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
  }

  render() {
    const { errors } = this.state 

    return (
      <div className=''>
        <div className="">
          <div className="">
            <h2 style={{ textAlign: 'center' }}>Log In</h2>
            <p style={{ textAlign: 'center' }}>Sign in to your account</p>
            <form onSubmit={ this.onSubmitHandler }>
              <TextFieldGroup 
                placeholder='Email Address'
                name='email'
                type='email'
                value={ this.state.email }
                onChange={ this.onChangeHandler }
                error={ errors.email }
              />
              <TextFieldGroup 
                placeholder='Password'
                name='password'
                type="password"
                value={ this.state.password }
                onChange={ this.onChangeHandler }
                error={ errors.password }
              />
              <input type="submit" id='login-page-button' />
            </form>
          </div>
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

export default connect(mapStateToProps, { loginUser })(Login)
