import React from 'react'

import './NestedCommentBody.css'

const NestedCommentBody = ({ nestedComment }) => ( 
  nestedComment.text && <p className='nested_comments_text'>{nestedComment.text}</p>
)

export default NestedCommentBody