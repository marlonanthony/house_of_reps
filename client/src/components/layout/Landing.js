import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux'

// import ProfileCards from '../profile-cards/ProfileCards'
import './Landing.css'
// import background from '../../img/dj.jpg'

class Landing extends Component {

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  render() {
    return (
      <div 
        // style={{
        //   position: 'relative',
        //   backgroundImage: `url(${background})`,
        //   backgroundSize: 'cover',
        //   backgroundPosition: 'center',
        //   height: '100vh',
        //   marginBottom: '-50px'
        // }}
        className='fade-pic'
        >
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">House of Reps</h1>
                <p className="lead">Create your account, share posts and get help from other DJs</p>
                <hr />
                <Link to='/register' className='btn btn-lg btn-info mr-2'>Sign Up</Link>
                <Link to='/login' className='btn btn-lg btn-light'>Login</Link>
              </div>
            </div>
          </div>
        </div>
        {/* <div className='fade-pic'>
          <img 
            style={{ width: '100vw', height: '93.5vh', position: 'relative' }}
            src={require('../../img/dj.jpg')} 
            alt="Landing Pic"/>
        </div>   */}
         {/* <ProfileCards /> */}
      </div>
      
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Landing)
