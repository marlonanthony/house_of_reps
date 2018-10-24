import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { registerUser } from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'
import './Register.css'

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard') // Change this to '/profile'
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmitHandler = e => {
    e.preventDefault()
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }
    this.props.registerUser(newUser, this.props.history) 
  }

  render() {
    const { errors } = this.state  

    return (
      <div className="">
        <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
        <p style={{ textAlign: 'center' }}>Create your account</p>
        <div id='register-content'>
          <form id='register-form' onSubmit={ this.onSubmitHandler }>
            <TextFieldGroup
              type="text"
              name='name'
              value={ this.state.name }
              placeholder='Name'
              onChange={this.onChangeHandler}
              error={ errors.name }
            />
            <TextFieldGroup
              type="email"
              name='email'
              placeholder='Email'
              value={ this.state.email }
              onChange={this.onChangeHandler}
              error={ errors.email }
            />
            <TextFieldGroup
              type="password"
              name='password'
              placeholder='Password'
              value={ this.state.password }
              onChange={this.onChangeHandler}
              error={ errors.password }
            />
            <TextFieldGroup
              type="password"
              name='password2'
              placeholder='Confirm Password'
              value={ this.state.password2 }
              onChange={this.onChangeHandler}
              error={ errors.password2 }
            />
            <input type="submit" id='register-button' />
          </form>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors 
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register))