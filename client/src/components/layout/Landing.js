import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions' 
import './Landing.css'

class Landing extends Component {
  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/feed')
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className='fade-pic'>
          <div className="dark-overlay">
            <div className="landing_content">
              <div style={{ marginTop: '40vh', textAlign: 'center' }}>
                <h1 style={{fontSize: '3.5em', color: '#bdc7c1'}}>House of Reps</h1>
                <h6 style={{fontSize: '1em', color: '#7e8889', marginBottom: '15px', marginTop: '-15px'}}>
                  Community of DJs by DJs for DJs
                </h6>
                <Link to='/login'><button className='landing_buttons'>Sign In</button></Link>
                <Link to='/register'><button className='landing_buttons'>Sign Up</button></Link> 
              </div>
              <footer className='landing_footer'>
                Copyright &copy; 2019 House of Reps
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
  errors: state.errors,
})

export default connect(mapStateToProps, { loginUser })(Landing)
