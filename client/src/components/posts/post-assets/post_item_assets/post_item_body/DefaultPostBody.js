import React from 'react'
import PropTypes from 'prop-types'

import PostText from '../../text/PostText'

export default function DefaultPostBody({ post, modalToggle, youtubeUrl }) {
  return !post.description &&
    !post.image &&
    !post.title &&
    !post.url &&
    !post.media ? (
    <PostText postText={post.text} />
  ) : post.media ? (
    <div>
      <PostText postText={post.text} />
      <img
        className="postfeed-media-pic"
        onClick={modalToggle}
        src={post.media}
        alt="uploaded"
      />
    </div>
  ) : (
    <div className="post_content">
      {post.text && <PostText postText={post.text} />}
      <div>
        {youtubeUrl ? (
          <iframe
            title="youtube"
            width="100%"
            height="300"
            src={youtubeUrl}
            frameBorder={0}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
          ></iframe>
        ) : (
          <a href={post.url} target="_blank" rel="noopener noreferrer">
            <img
              src={post.image}
              alt="thumbnail"
              style={{ width: '100%' }}
              id="post-link-img"
            />
          </a>
        )}
        <p style={{ textAlign: 'center', fontSize: '12px' }}>{post.title}</p>
        <p
          style={{
            textAlign: 'center',
            fontSize: '12px',
            padding: '0 5px 20px 5px'
          }}
        >
          {post.description}
        </p>
      </div>
    </div>
  )
}

DefaultPostBody.propTypes = {
  post: PropTypes.object.isRequired,
  modalToggle: PropTypes.func.isRequired,
  youtubeUrl: PropTypes.string
}

// if (post.title || post.url || post.description || post.image) {
//   return (
//     <div className="post_content">
//       <div>
//         {post.text && <PostText postText={post.text} />}
//         {youtubeUrl ? (
//           <iframe
//             title="youtube"
//             width="100%"
//             height="300"
//             src={youtubeUrl}
//             frameBorder={0}
//             allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen={true}
//           ></iframe>
//         ) : (
//           post.image && (
//             <a href={post.url} target="_blank" rel="noopener noreferrer">
//               <img
//                 src={post.image}
//                 alt="thumbnail"
//                 style={{ width: '100%' }}
//                 id="post-link-img"
//               />
//             </a>
//           )
//         )}
//         <p style={{ textAlign: 'center', fontSize: '12px' }}>
//           {post.title && post.title}
//         </p>
//         <p
//           style={{
//             textAlign: 'center',
//             fontSize: '12px',
//             padding: '0 5px 20px 5px'
//           }}
//         >
//           {post.description && post.description}
//         </p>
//       </div>
//     </div>
//   )
// } else if (post.media) {
//   return (
//     <div>
//       {post.text && <PostText postText={post.text} />}
//       <img
//         className="postfeed-media-pic"
//         onClick={modalToggle}
//         src={post.media}
//         alt="uploaded"
//       />
//     </div>
//   )
// } else return post.text && <PostText postText={post.text} />
// }
