import React from 'react'
import './NestedCommentForm.css'

export default function NestedCommentForm({
  showForm,
  showNestedSubmitBtnHandler,
  onChange,
  text,
  postId,
  comment,
  addNewNestedComment,
  showNestedSubmitBtn
}) {
  return showForm &&
    <div className='nested_comment_form' onClick={showNestedSubmitBtnHandler}>
      <textarea 
        placeholder="Reply to comment" 
        name='text'
        value={text} 
        onChange={onChange} 
        className='nested_comment_textarea'
        // error={errors.text} 'rgb(173, 187, 199)'
      />
      { showNestedSubmitBtn &&
        <div>
          <i onClick={() => addNewNestedComment(postId, comment._id)} 
             id='post-submit-icon' 
             className='far fa-paper-plane'
          />
        </div>
      }
    </div>
}
