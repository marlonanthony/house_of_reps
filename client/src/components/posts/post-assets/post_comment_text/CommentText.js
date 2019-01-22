import React from 'react'
import reactStringReplace from 'react-string-replace'
import { Link } from 'react-router-dom'

export default function CommentText({ commentText }) {
  let replacedText;
 
  // Match URLs
  replacedText = reactStringReplace(commentText, /(https?:\/\/\S+)/g, (match, i) => (
    <a className='post_text_urls' key={match + i} href={match} target='_blank' rel='noopener noreferrer'>{match}</a>
  ));
   
  // Match @-mentions
  replacedText = reactStringReplace(replacedText, /@(\w+)/g, (match, i) => (
    <Link className='post_text_mentions' key={match + i} to={`/profile/${match}`}>@{match}</Link>
  ));
   
  // Match hashtags
  replacedText = reactStringReplace(replacedText, /#(\w+)/g, (match, i) => (
    <a className='post_text_hashtags' key={match + i} target='_blank' rel='noopener noreferrer' href={`https://twitter.com/hashtag/${match}`}>#{match}</a>
  ));
    
  

  return (
    <p className='post_content' style={{fontSize: '13px'}}>
      { replacedText }
    </p>
  )
  // return (
  //   <Fragment>
  //     <p className='post_content' >
  //       { <span className='hashtags' style={{color: 'rgb(205,205,205)', fontSize: '13.5px' }}
  //           dangerouslySetInnerHTML={{
  //             __html : commentText.replace(/((\#|@)\w+)/gi, "<a href='#'>$&</a>")
  //           }}
  //         /> 
  //       }
  //     </p>
  //   </Fragment>
  // )
}