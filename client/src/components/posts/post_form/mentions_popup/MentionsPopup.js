import React from 'react'
import './MentionsPopup.css'

export default function MentionsPopup({
  matchedMentions,
  mentionsPopupHandler
}) {
  return matchedMentions.length ? (
    <div className="mention_popup_container">
      <div className="mention_subcontainer">
        {matchedMentions.map((person, i) => (
          <p
            className="mention_popup"
            key={i}
            onClick={() => mentionsPopupHandler(person)}
          >
            @{person}
          </p>
        ))}
      </div>
    </div>
  ) : null
}
