import React, {Fragment} from 'react'

export default function PostText({ postText }) {
  return (
    <Fragment>
      <p className='post_content' >
        { <span className='hashtags' style={{color: 'rgb(205,205,205)'}}
            dangerouslySetInnerHTML={{
              __html : postText.replace(/((\#|@)\w+)/gi, "<a href='#'>$&</a>")
            }}
          /> 
        }
      </p>
    </Fragment>
  )
}
