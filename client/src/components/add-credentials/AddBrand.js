import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types' 
import { addStore, addPerk, addBrand } from '../../actions/profileActions'
import CreateProfileTextFieldGroup from '../common/create-profile-inputs/CreateProfileTextFieldGroup'
import classnames from 'classnames'

class AddBrand extends Component {
  state = {
    image: '',
    url: '',
    description: '',
    errors: {}
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
    
    const brandData = {
      image: this.state.image,
      url: this.state.url,
      description: this.state.description
    }

    this.props.addBrand(brandData, this.props.history)
  }

  render() {
    const { errors } = this.state 
    return (
      <div className='add-djpool'>
        <Link to='/dashboard'>
          <i id='addvenue-back-button' className='fas fa-arrow-alt-circle-left' alt='back-button' />
        </Link>
        <h1 style={{ textAlign: 'center', color: '#ccc', paddingTop: '70px' }}>Add Brand</h1>
        {/* setting input div classname to djpools for lack of repitition */}
        <div className='djpools_input_wrapper'>
          <form onSubmit={ this.onSubmit }>
            <CreateProfileTextFieldGroup 
                name='url'
                type='text'
                value={ this.state.url }
                onChange={ this.onChange }
                error={ errors.url }
                placeholder='URL'
              />
            <CreateProfileTextFieldGroup 
              name='image'
              type='text'
              value={ this.state.image }
              onChange={ this.onChange }
              error={ errors.image }
              placeholder='image'
            />
            <CreateProfileTextFieldGroup 
              name='description'
              type='text'
              value={ this.state.description }
              onChange={ this.onChange }
              error={ errors.description }
              placeholder='description'
            />
            <input type="submit" value='Submit' id='venue-submit-button' style={{ marginLeft: '10px' }} />
          </form>
        </div>
      </div>
    )
  }
}

AddBrand.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addStore: PropTypes.func.isRequired,
  addPerk: PropTypes.func.isRequired,
  addBrand: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  auth: state.auth 
})

export default connect(mapStateToProps, { addStore, addPerk, addBrand })(withRouter(AddBrand))