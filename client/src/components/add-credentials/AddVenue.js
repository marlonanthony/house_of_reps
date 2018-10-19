import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types' 
import { addVenue } from '../../actions/profileActions'
import './AddVenue.css'

class AddVenue extends Component {
  state = {
    location: '',
    date: '',
    description: '',
    errors: {},
    title: ''
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    
    const venueData = {
      date: this.state.date,
      location: this.state.location,
      description: this.state.description,
      title: this.state.title
    }

    this.props.addVenue(venueData, this.props.history)
  }

  render() {
    const { errors } = this.state 

    return (
      <div className='add-venue'>
        <Link to='/dashboard'>
          <img id='addvenue-back-button' src={require('../../img/back.png')} alt='back-button' />
        </Link>
        <h1 style={{ textAlign: 'center' }}>Add Venue</h1>
        <p style={{ textAlign: 'center' }}>Add your upcoming venues</p>
        <form onSubmit={ this.onSubmit }>
          <TextFieldGroup 
            name='date'
            type='date'
            value={ this.state.date }
            onChange={ this.onChange }
            error={ errors.date }
          />
          <TextFieldGroup 
            placeholder='Title'
            name='title'
            value={ this.state.title }
            onChange={ this.onChange }
            error={ errors.title }
          />
          <TextFieldGroup 
            placeholder='* Location of Event'
            name='location'
            value={ this.state.location }
            onChange={ this.onChange }
            error={ errors.location }
          />
          <TextAreaFieldGroup 
            placeholder='Quick description'
            name='description'
            value={ this.state.description }
            onChange={ this.onChange }
            error={ errors.description }
          />
          <input type="submit" value='Submit' id='venue-submit-button' />
        </form>
      </div>
    )
  }
}

AddVenue.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addVenue: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors 
})

export default connect(mapStateToProps, { addVenue })(withRouter(AddVenue))