import React from 'react'
import InfinteScroll from 'react-infinite-scroll-component'
import PostFeed from '../post_feed/PostFeed'
import Spinner from '../../common/Spinner'

export default function PostsContainer({
  posts,
  profiles,
  loading,
  fetchMore,
  showsPreview
}) {
  if (!posts || !profiles || loading) {
    return <Spinner />
  }

  return (
    <div className="post-feed-post-content">
      <InfinteScroll
        dataLength={posts.length}
        next={fetchMore}
        hasMore={true}
        loader={null}
      >
        <PostFeed
          showPreview={showsPreview}
          posts={posts}
          profiles={profiles}
        />
      </InfinteScroll>
    </div>
  )
}
