import React from 'react'

export default function Buttons({ showPostByHashtag }) {
  return (
    <div className='postfeed_reps_btns'>
      <img 
        onClick={() => showPostByHashtag('bookings') } 
        src={require('../../../../img/BUTTONSGS.png')} 
        alt='bookings'
        title='bookings'
      />
      <img 
        onClick={() => showPostByHashtag('mixes') } 
        src={require('../../../../img/DJMIXES.png')} 
        alt='mixes'
        title='mixes'
      />
      <img 
        onClick={() => showPostByHashtag('marketplace') } 
        src={require('../../../../img/GEARMARKETPNG.png')} 
        alt='marketplace'
        title='marketplace'
      />
      <img 
        onClick={() => showPostByHashtag('downloads') } 
        src={require('../../../../img/MUSIC.png')} 
        alt='downloads'
        title='downloads'
      />
      <img 
        onClick={() => showPostByHashtag('news') } 
        src={require('../../../../img/NEWS.png')} 
        alt='news'
        title='news'
      />
      <img 
        onClick={() => showPostByHashtag('reps') } 
        src={require('../../../../img/REPSFLOOR.png')} 
        alt='reps'
        title='reps'
      />
      <img 
        onClick={() => showPostByHashtag('video') } 
        src={require('../../../../img/VIDEO.png')} 
        alt='video'
        title='video'
      />
    </div>
  )
}
