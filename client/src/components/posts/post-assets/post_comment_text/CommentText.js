import React, {Fragment} from 'react'

export default function CommentText({ commentText }) {
  return (
    <Fragment>
      <p className='post_content' >
        { <span className='hashtags' style={{color: 'skyblue'}}
            dangerouslySetInnerHTML={{
              __html : commentText.replace(/(\#\w+)/gi, "<a href='#'>$&</a>")
            }}
          /> 
        }
      </p>
    </Fragment>
  )
}