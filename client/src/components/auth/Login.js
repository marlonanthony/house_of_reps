import React, { Component } from 'react'

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmitHandler = e => {
    e.preventDefault() 
    const user = {
      email: this.state.email,
      password: this.state.password
    }

    console.log(user) 
  }

  render() {
    return (
      <div className='container'>
        <div className="row">
          <div className="col-md-8 m-auto">
            <h2 className="display-4 text-center">Log In</h2>
            <p className="lead text-center">Sign in to your account</p>
            <form onSubmit={ this.onSubmitHandler }>
              <div className="form-group">
                <input 
                  type="email"
                  className='form-control form-control-lg'
                  placeholder='Email Address'
                  name='email'
                  value={ this.state.email }
                  onChange={ this.onChangeHandler }
                />
              </div>
              <div className="form-group">
                <input 
                  type="password"
                  className='form-control form-control-lg'
                  placeholder='Password'
                  name='password'
                  value={ this.state.password }
                  onChange={ this.onChangeHandler }
                />
              </div>
              <input type="submit" className='btn btn-info btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    )
  }
}
