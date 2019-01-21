import React, { Component } from 'react'
import reactStringReplace from 'react-string-replace'
import { Link } from 'react-router-dom'



export default class PostText extends Component {
  render() {
    let replacedText;
 
    // Match URLs
    replacedText = reactStringReplace(this.props.postText, /(https?:\/\/\S+)/g, (match, i) => (
      <a key={match + i} href={match}>{match}</a>
    ));
     
    // Match @-mentions
    replacedText = reactStringReplace(replacedText, /@(\w+)/g, (match, i) => (
      <Link key={match + i} to={`/profile/${match}`}>@{match}</Link>
    ));
     
    // Match hashtags
    replacedText = reactStringReplace(replacedText, /#(\w+)/g, (match, i) => (
      <a key={match + i} target='_blank' href={`https://twitter.com/hashtag/${match}`}>#{match}</a>
    ));
      
    
  
    return (
      <div className='post_content' >
        { replacedText }
      </div>
    )
  }
}



// <span className='hashtags' style={{color: 'rgb(205,205,205)'}}
//   dangerouslySetInnerHTML={{
//     __html : postText.replace(/((\#\w+)|(@)\w+)/gi, "<a href='#'>$&</a>")
//   }}
// /> 