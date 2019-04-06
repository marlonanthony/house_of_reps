import React from 'react'

const SearchPost = props  => (
  <div className='searchbarpost'>
    <input
      placeholder='search post'
      name='matches'
      value={ props.matches }
      onChange={ props.onChange }
      className='searchbarpostinput'
    />
    { props.showMatches
      ? (<button  style={{background: '#060606'}} className='searchbarpostbtn' onClick={props.onSearchPostClick} title='toggle filter'>
          <i className='fas fa-search'/>
        </button>)
      : (<button className='searchbarpostbtn' onClick={props.onSearchPostClick} title='toggle filter'>
          <i className='fas fa-search'/>
        </button>)
    }
  </div>
)

export default SearchPost
