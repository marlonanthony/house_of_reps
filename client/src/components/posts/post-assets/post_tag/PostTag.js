import React from 'react'
import SelectList from '../../../common/select_list/SelectList'
import './PostTag.css'

export default function PostTag({ tag, errors, showTags, onChange }) {
  const options = [
    { label: 'choose a tag', value: '' },
    { label: 'marketplace', value: 'marketplace' },
    { label: 'mixes', value: 'mixes' },
    { label: 'video', value: 'video' },
    { label: 'downloads', value: 'downloads' },
    { label: 'news', value: 'news' },
    { label: 'gigswap', value: 'gigswap' },
    { label: 'help', value: 'help' },
    { label: 'recommendations', value: 'recommendations' },
    { label: 'conversation', value: 'conversation' }
  ]

  return (
    showTags && (
      <div className="post_tag_container">
        <SelectList
          name="tag"
          value={tag}
          onChange={onChange}
          error={errors.tag}
          options={options}
        />
      </div>
    )
  )
}
