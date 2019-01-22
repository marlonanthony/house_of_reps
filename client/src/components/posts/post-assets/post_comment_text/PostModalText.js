import React, {Fragment} from 'react'
import reactStringReplace from 'react-string-replace'
import { Link } from 'react-router-dom'

export default function PostText({ postText }) {
  let replacedText;
 
  // Match URLs
  replacedText = reactStringReplace(postText, /(https?:\/\/\S+)/g, (match, i) => (
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
    <p className='post_content' style={{textAlign: 'center'}} >
      { replacedText }
    </p>
  )

  // return (
  //   <Fragment>
  //     <p id='comment-modal-text' >
  //       { <span className='hashtags' style={{color: 'rgb(205,205,205)'}}
  //           dangerouslySetInnerHTML={{
  //             __html : postText.replace(/((\#|@)\w+)/gi, "<a href='#'>$&</a>")
  //           }}
  //         /> 
  //       }
  //     </p>
  //   </Fragment>
  // )
}