import React from 'react'

const SearchPost = props  => (
  <div className='searchbarpost'>
    <input
      placeholder='search post'
      name='matches'
      value={ props.matches }
      onChange={ props.onChange }
      className='searchbarinput'
    />
    { props.showMatches
      ? (<button  style={{background: 'black'}} className='searchbarpostbtn' onClick={props.onSearchPostClick} title='toggle filter'>
          <i className='fas fa-search' style={{ color: 'rgb(55, 131, 255)' }} />
        </button>)
      : (<button className='searchbarpostbtn' onClick={props.onSearchPostClick} title='toggle filter'>
          <i className='fas fa-search' style={{ color: 'rgb(55, 131, 194)' }}/>
        </button>)
    }
  </div>
)

export default SearchPost
