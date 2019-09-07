import React from 'react'

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
    <div onClick={showNestedSubmitBtnHandler} 
         style={{marginLeft: 50, display: 'flex', flexDirection: 'column', background: 'none'}}>
      <textarea 
        placeholder="Reply to comment" 
        name='text'
        value={text} 
        onChange={onChange} 
        className='nested_comment_textarea'
        // error={errors.text} 'rgb(173, 187, 199)'
      />
      { showNestedSubmitBtn &&
        <div style={{padding: '10px 0px', display: 'flex', justifyContent: 'center'}}>
          <i onClick={() => addNewNestedComment(postId, comment._id)} 
             id='post-submit-icon' 
             className="far fa-paper-plane" 
          />
        </div>
      }
    </div>
}
