import React, { Component } from 'react'

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
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
    console.log(newUser)
  }

  render() {
    const { name, email } = this.state 
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h2 className="display-4 text-center">Sign Up</h2>
            <p className="lead text-center">Create your account</p>
            <form onSubmit={ this.onSubmitHandler }>
              <div className='form-group'>
                <input 
                  type="text"
                  className='form-control form-control-lg'
                  placeholder='Name'
                  name='name'
                  value={ this.state.name }
                  required
                  onChange={this.onChangeHandler}
                />
              </div>
              <div className='form-group'>
                <input 
                  type="email"
                  className='form-control form-control-lg'
                  placeholder='Email'
                  name='email'
                  value={ this.state.email }
                  required
                  onChange={this.onChangeHandler}
                />
              </div>
              <div className='form-group'>
                <input 
                  type="password"
                  className='form-control form-control-lg'
                  placeholder='Password'
                  name='password'
                  value={ this.state.password }
                  required
                  onChange={this.onChangeHandler}
                />
              </div>
              <div className='form-group'>
                <input 
                  type="password"
                  className='form-control form-control-lg'
                  placeholder='Confirm Password'
                  name='password2'
                  value={ this.state.password2 }
                  required
                  onChange={this.onChangeHandler}
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

export default Register 