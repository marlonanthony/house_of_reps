import React from 'react'
import Icon from '../../../UI/icons/Icon'
import './NestedCommentForm.css'
import TextAreaForm from '../../../common/textarea/TextAreaForm'

export default function NestedCommentForm({
  errors,
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
      <TextAreaForm 
        placeholder="Reply to comment" 
        name='text'
        value={text} 
        onChange={onChange}
        autoFocus
        error={errors.text}
      />
      { showNestedSubmitBtn && 
        <div>
          <Icon icon='far fa-paper-plane' title='submit' toggleIcon={() => addNewNestedComment(postId, comment._id)} />
        </div>
      }
    </div>
}
