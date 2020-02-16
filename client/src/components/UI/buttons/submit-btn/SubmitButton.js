import React from 'react'

export default function SubmitButton({ type, text, onClick }) {
  return (
    <input
      type={type || 'submit'}
      value={text || 'Submit'}
      title="submit"
      className="add-promo-submit-btn"
      onClick={onClick}
    />
  )
}
