import React from 'react'
import EmojiModal from '../../../UI/modal/EmojiModal'

const HashtagInputs = ({
  showTags, 
  onTagSubmit, 
  onChange, 
  tag1, 
  tag2, 
  tag3, 
  tag4
}) =>  showTags &&
  <EmojiModal>
    <form onSubmit={onTagSubmit}>
      <p style={{ textAlign: 'center' }}>
        <span role='img' aria-label='fire emoji'>🔥</span> hashtags yonder
      </p>
      <input type="text" onChange={onChange} name='tag1' value={tag1} />
      <input type="text" onChange={onChange} name='tag2' value={tag2} />
      <input type="text" onChange={onChange} name='tag3' value={tag3} />
      <input type="text" onChange={onChange} name='tag4' value={tag4} />
      <button>ok</button>
    </form>
  </EmojiModal>

export default HashtagInputs