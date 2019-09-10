import React from 'react'
import Icon from '../../../UI/icons/Icon'
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
        autoFocus
      />
      { showNestedSubmitBtn && 
        <div>
          <Icon icon='far fa-paper-plane' title='submit' toggleIcon={() => addNewNestedComment(postId, comment._id)} />
        </div>
      }
    </div>
}
