import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
// import TextFieldGroup from '../common/TextFieldGroup'
// import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types' 
import { addVenue } from '../../actions/profileActions'
import classnames from 'classnames'
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
          <i id='addvenue-back-button' className='fas fa-arrow-alt-circle-left' alt='back-button' />
        </Link>
        <h1 style={{ textAlign: 'center', color: '#ccc' }}>Add Event</h1>
        <p style={{ textAlign: 'center', color: '#777' }}>Add your upcoming events</p>
        <div style={{ }}>
          <form onSubmit={ this.onSubmit }>
            {/* <TextFieldGroup 
              name='date'
              type='date'
              value={ this.state.date }
              onChange={ this.onChange }
              error={ errors.date }
            /> */}
            <div>
              <input 
                type='date'
                className={classnames('register-inputs', {
                  'errors': errors.date 
                })}
                name='date'
                value={ this.state.date }
                onChange={ this.onChange }
                error={ errors.date }
                style={{ fontSize: '20px' }}
              />
              { <div><span style={{ marginLeft: '10px', color: 'red' }}>{errors.date}</span></div> }
            </div>
            <div>
              <input 
                type='text'
                className={classnames('register-inputs', {
                  'is-invalid': errors
                })}
                name='title'
                value={ this.state.title }
                onChange={ this.onChange }
                error={ errors.title }
                placeholder='Title'
              />
              { <div><span style={{ marginLeft: '10px', color: 'red'}}>{errors.title}</span></div> }
            </div>
            <div>
              <input 
                type='text'
                className={classnames('register-inputs', {
                  'errors': errors
                })}
                name='location'
                value={ this.state.location }
                onChange={ this.onChange }
                error={ errors.location }
                placeholder='Location of Event'
              />
              { <div><span style={{ marginLeft: '10px', color: 'red'}}>{errors.location}</span></div> }
            </div>
            {/* <TextFieldGroup 
              placeholder='Title'
              name='title'
              value={ this.state.title }
              onChange={ this.onChange }
              error={ errors.title }
            /> */}
            {/* <TextFieldGroup 
              placeholder='* Location of Event'
              name='location'
              value={ this.state.location }
              onChange={ this.onChange }
              error={ errors.location }
            /> */}
            <div>
              <textarea 
                className={classnames('register-text-area', {
                  'errors': errors
                })}
                placeholder='Quick description'
                name='description'
                value={ this.state.description }
                onChange={ this.onChange }
                error={ errors.description }
                rows={3}
              />
              { errors && (<div className='errors'>{errors.description}</div>)}
            </div>
            {/* <div style={{ width: '53.5%' }}>
              <TextAreaFieldGroup 
                placeholder='Quick description'
                name='description'
                value={ this.state.description }
                onChange={ this.onChange }
                error={ errors.description }
              />
            </div> */}
            <input type="submit" value='Submit' id='venue-submit-button' />
          </form>
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