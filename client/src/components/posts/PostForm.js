import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux' 
import TextAreaFieldGroup from '../common/TextAreaFieldGroup' 
import { addPost } from '../../actions/postActions' 
import Embed from '../slate/embed/Embed'
import './PostForm.css'

class PostForm extends Component {
  state = {
    text: '',
    errors: {},
    rows: 2,
    minRows: 2,
    maxRows: 10
  }

  componentWillReceiveProps(newProps) {
    if(newProps.errors) {
      this.setState({ errors: newProps.errors })
    }
  }

  onChange = e => {
    const textareaLineHeight = 24
    const { minRows, maxRows } = this.state 

    const previousRows = e.target.rows 
    e.target.rows = minRows // reset number of rows in textarea

    const currentRows = e.target.scrollHeight / textareaLineHeight 

    if(currentRows === previousRows) {
      e.target.rows = currentRows
    }

    if(currentRows >= maxRows) {
      e.target.rows = maxRows
      e.target.scrollTop = e.target.scrollHeight
    }

    this.setState({ 
      [e.target.name]: e.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows
    })
  }

  onSubmit = e => {
    e.preventDefault()
    
    const { user } = this.props.auth 

    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar 
    }

    this.props.addPost(newPost) 
    this.setState({ text: '' })
  }
  

  render() {
    const { errors } = this.state 
    return (
      <div className='post_form'>
        <Embed />
        {/* <form onSubmit={this.onSubmit}>
            <TextAreaFieldGroup
              className='text-area'
              placeholder="What's the discussion?"
              name='text'
              value={this.state.text} 
              onChange={this.onChange} 
              error={errors.text} 
              rows={this.state.rows}
            />
          <button className=" post_submit_button">Submit</button>
        </form> */}
        
      </div>
    )
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors, 
  auth: state.auth 
})

export default connect(mapStateToProps, { addPost })(PostForm)
