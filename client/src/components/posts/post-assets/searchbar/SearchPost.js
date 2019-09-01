import React from 'react'

const SearchPost = props  => (
  <div className='searchbarpost'>
    <input 
      placeholder='Search by hashtag' 
      onChange={props.onChange} 
      value={props.hashtag} 
      name='hashtag'
      className='searchbarpostinput'
    />
    { props.showHashtags
      ? <button 
          style={{background: 'var(--secondary-color)', color: 'var(--text-color)'}} 
          className='searchbarpostbtn' 
          onClick={props.showPostByHashtag} 
          title='posts by hashtag'>
          <i className='fas fa-search'/>
        </button>
      : <button className='searchbarpostbtn' 
          onClick={props.showPostByHashtag} 
          title='posts by hashtag'>
          <i className='fas fa-search'/>
        </button>
    }
  </div>
)

export default SearchPost
