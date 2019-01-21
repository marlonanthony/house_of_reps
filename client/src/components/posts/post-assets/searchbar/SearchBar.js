import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import InputGroup from '../../../common/InputGroup'


class SearchBar extends Component {
  state = {
    matches: '',
    showMatches: ''
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onMouseEnter = () => {
    this.setState({ showMatches: true })
  }

  onMouseLeave = () => {
    this.setState({ showMatches: false })
  }

  render() {
    return (
      <div className='searchbar' onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} style={{
        width: '100%',
        position: 'relative',
        zIndex: 2,
        background: 'rgba(0,0,0,0.99)',
        height: '45px'
        }}>
        <InputGroup 
          placeholder='reps'
          name='matches'
          value={ this.state.matches }
          onChange={ this.onChange } 
        />
        <i className='fas fa-search' style={{position: 'absolute', right: 0, top: 5, color: 'rgb(55, 131, 194)',}}/>
        { this.state.showMatches ?
        <ul style={{color: '#ccc', listStyle: 'none', textAlign: 'end', position: 'absolute', top: '65%', right: 0 }}>
          { this.props.profiles ? this.props.profiles.map(profile => (
            profile.handle.toLowerCase().includes(this.state.matches.toLowerCase()) || 
            profile.user.name.toLowerCase().includes(this.state.matches.toLowerCase()) || 
            profile.stageName.toLowerCase().includes(this.state.matches.toLowerCase()) ?
            <li className='searchbar_items'  key={profile.user._id}>
              <Link to={`/profile/${profile.handle}`} className='searchbar_links'><small>@{profile.handle}</small></Link>
            </li> : null
          )) : null } 
        </ul> : null }
      </div>
    )
  }
}

export default SearchBar
