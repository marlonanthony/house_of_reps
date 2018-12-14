import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions' 
import TextFieldGroup from '../common/TextFieldGroup'
import Modal from '.././UI/modal/Modal'
import Backdrop from '../UI/backdrop/Backdrop'
import './Landing.css'

class Landing extends Component {

  state = {
    email: '',
    password: '',
    errors: {},
    showModal: false
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

  showHandler = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }))
  }

  modalToggle = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }))
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
    const { showModal, errors } = this.state 

     const signInModal = showModal ? (
      <React.Fragment> 
        <Modal show={this.state.showModal}>
          <h2 id='login-title'>Log In</h2>
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
              type='password'
              value={ this.state.password }
              onChange={ this.onChangeHandler }
              error={ errors.password }
            />
            <button type="submit" id='login-button'>Sign In</button>
          </form>
        </Modal>
      </React.Fragment>
    ) : null 

    
    return (
      <React.Fragment>
        <Backdrop clicked={this.modalToggle} show={this.state.showModal} />
        { signInModal }
        <div className='fade-pic'>
          <div className="dark-overlay">
            <div className="landing_content">
              <div style={{ marginTop: '40vh', textAlign: 'center' }}>
                <h1 style={{fontSize: '3.5em', color: '#bdc7c1'}}>House of Reps</h1>
                <h6 style={{fontSize: '1em', color: '#7e8889', marginBottom: '15px', marginTop: '-15px'}}>
                  Community of DJs by DJs for DJs
                </h6>
                <button onClick={this.showHandler} className='landing_buttons'>Sign In</button>
                <Link to='/register'><button className='landing_buttons'>Sign Up</button></Link>
              </div>
              <footer className='landing_footer'>
                Copyright &copy; 2018 House of Reps
              </footer>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors 
})

export default connect(mapStateToProps, { loginUser })(Landing)
