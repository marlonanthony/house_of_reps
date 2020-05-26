import React from 'react'

export default function MentionsPopup({
  matchedMentions,
  mentionsPopupHandler
}) {
  return (
    <div className="mention_popup_container">
      {(matchedMentions.length &&
        matchedMentions.map((person, i) => (
          <p
            className="mention_popup"
            key={i}
            onClick={() => mentionsPopupHandler(person)}
          >
            @{person}
          </p>
        ))) ||
        null}
    </div>
  )
}
