import React from 'react'
import './YouTubeOrLink.css'

export default function YouTubeOrLink({ value, youtubeUrl }) {
  return (
    <div>
      {youtubeUrl ? (
        <>
          <iframe
            title="youtube"
            className="youtube_or_link_iframe"
            src={youtubeUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
          ></iframe>
        </>
      ) : (
        <a href={value.url} target="_blank" rel="noopener noreferrer">
          <img src={value.image} alt="thumbnail" id="post-link-img" />
        </a>
      )}
      <div className="youtube_link_title_desc_wrapper">
        <p>{value.title}</p>
        <p>{value.description}</p>
      </div>
    </div>
  )
}
