import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types' 
import { addVenue } from '../../actions/profileActions'

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
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to='/dashboard' className='btn btn-light'>Go Back</Link>
              <h1 className="display-4 text-center">Add Venue</h1>
              <p className="lead text-center">Add your upcoming venues</p>
              <small className='d-block pb-4'>* = required fields</small>
              <form onSubmit={ this.onSubmit }>
                <h6>* Date of Event</h6>
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
                <input type="submit" value='Submit' className='btn btn-info btn-block mt-4' />
              </form>
            </div>
          </div>
        </div>
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