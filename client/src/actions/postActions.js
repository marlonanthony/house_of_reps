import axios from 'axios' 
import { 
  ADD_POST,
  EDIT_POST,
  EDIT_COMMENT,
  GET_ERRORS,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  ADD_COMMENT,
  GET_POST,
  CLEAR_ERRORS,
  DELETE_COMMENT,
  GET_MORE_POSTS,
  ADD_NESTED_COMMENT,
  REMOVE_NESTED_COMMENT,
  ADD_LIKE,
  REMOVE_LIKE,
  ADD_COMMENT_LIKE,
  REMOVE_COMMENT_LIKE,
  ADD_NESTED_COMMENT_LIKE,
  REMOVE_NESTED_COMMENT_LIKE
} from './types' 

// Add Post 
export const addPost = postData => async dispatch => {
  try {
    dispatch(clearErrors()) 
    const res = await axios.post('/api/posts', postData)
    dispatch({
      type: ADD_POST,
      payload: res.data 
    })
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data 
    })
  }
}

// Get Posts 
export const getPosts = (count, start) => async dispatch => {
  try {
    dispatch(setPostLoading()) 
    const res = await axios.get(`/api/posts?page=${start}&limit=${count}`)
    dispatch({
      type: GET_POSTS,
      payload: res.data 
    })
  } catch(err) {
    dispatch({
      type: GET_POSTS,
      payload: null
    })
  }
}

// Get Post 
export const getPost = id => async dispatch => {
  try {
    dispatch(setPostLoading())
    const res = await axios.get(`/api/posts/${id}`)
    dispatch({
      type: GET_POST,
      payload: res.data
    })
  } catch(err) {
      dispatch({
      type: GET_POST,
      payload: null
    })
  }
}

// Get Posts By Hashtag
export const getPostsByHashtag = hashtag => async dispatch => {
  try {
    dispatch(setPostLoading())
    const res = await axios.get(`/api/posts/hashtag/${hashtag}`)
    dispatch({
      type: GET_POSTS,
      payload: res.data
    })
  } catch(err) { console.log(err) }
}

// Get More Posts By Hashtag
export const getMorePostsByHashtag = (hashtag, count, start) => async dispatch => {
  try {
    dispatch(setPostLoading())
    const res = await axios.get(`/api/posts/hashtag/${hashtag}?page=${start}&limit=${count}`)
    dispatch({
      type: GET_MORE_POSTS,
      payload: res.data
    })
  } catch(err) { console.log(err) }
}

// Get Liked Posts 
export const getLikedPosts = (count, start) => async dispatch => {
  try {
    dispatch(setPostLoading()) 
    const res = await axios.get(`/api/posts/likedposts?page=${start}&limit=${count}`)
    dispatch({
      type: GET_POSTS,
      payload: res.data 
    })
  } catch(err) {
    console.log(err)
  }
}

// Get More Liked Posts 
export const getMoreLikedPosts = (count, start) => async dispatch => {
  try {
    dispatch(setPostLoading()) 
    const res = await axios.get(`/api/posts/likedposts?page=${start}&limit=${count}`)
    dispatch({
      type: GET_MORE_POSTS,
      payload: res.data 
    })
  } catch(err) {
    console.log(err)
  }
}


// Get Profile Posts 
export const getProfilePosts = (count, start, handle) => async dispatch => {
  try {
    dispatch(setPostLoading()) 
    const res = await axios.get(`/api/posts/profileposts/${handle}?page=${start}&limit=${count}`)
    dispatch({
      type: GET_POSTS,
      payload: res.data 
    })
  } catch(err) {
    dispatch({
      type: GET_POSTS,
      payload: null
    })
  }
}

// Get More Profile Posts
export const getMoreProfilePosts = (count, start, handle) => async dispatch => {
  try {
    dispatch(setPostLoading())
    const res = await axios.get(`/api/posts/profileposts/${handle}?page=${start}&limit=${count}`)
    dispatch({
      type: GET_MORE_POSTS,
      payload: res.data,
    }) 
  } catch(err) { console.log(err) }
}

// Get More Posts
export const getMorePosts = (count, start) => async dispatch => {
  try {
    dispatch(setPostLoading())
    const res = await axios.get(`/api/posts?page=${start}&limit=${count}`)
    dispatch({
      type: GET_MORE_POSTS,
      payload: res.data
    })
  } catch(err) { console.log(err) }
}

// Get Matching Posts
export const getMatchingPosts = (matches) => async dispatch => {
  try {
    dispatch(setPostLoading())
    const res = await axios.get(`/api/posts/search/:${matches}`)
    dispatch({
      type: GET_POSTS,
      payload: res.data
    })
  } catch(err) { console.log(err) } 
}

// Edit Post
export const editPostAction = (id, editedPost) => async dispatch => {
  try {
    dispatch(setPostLoading())
    const res = await axios.put(`/api/posts/${id}`, editedPost)
    dispatch({
      type: EDIT_POST,
      payload: res.data 
    })
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data 
    })
  }
}

// Edit Comment
export const editedCommentAction = (postId, commentId, editedComment) => async dispatch => {
  try {
    dispatch(setPostLoading())
    const res = await axios.put(`/api/posts/comment/${postId}/${commentId}`, editedComment)
    dispatch({
      type: EDIT_COMMENT,
      payload: {
        data: res.data,
        postId,
        commentId
      }
    })
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

// Delete Post 
export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`/api/posts/${id}`)
    dispatch({
      type: DELETE_POST,
      payload: id
    })
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data 
    })
  }
}

// Add Like
export const addLike = id => async dispatch => {
  try {
    const post = await axios.post(`/api/posts/like/${id}`)
    dispatch({
      type: ADD_LIKE,
      payload: post.data 
    })
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

// Remove Like
export const removeLike = id => async dispatch => {
  try {
    const post = await axios.post(`/api/posts/unlike/${id}`)
    dispatch({
      type: REMOVE_LIKE,
      payload: post.data 
    })
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

// Add Comment to Post 
export const addComment = (postId, commentData) => async dispatch => {
  try {
    dispatch(clearErrors()) 
    const res = await axios.post(`/api/posts/comment/${postId}`, commentData)
    dispatch({
      type: ADD_COMMENT,
      payload: res.data, 
    })
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data 
    })
  }
}

// Delete comment from post 
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`)
    dispatch({
      type: DELETE_COMMENT,
      payload: { commentId, postId }
    })
  } catch(err) { 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data 
    })
  }
}

// Add Like to Comment
export const addCommentLike = (postId, commentId) => async dispatch => {
  try {
    const post = await axios.post(`/api/posts/comment/like/${postId}/${commentId}`)
    dispatch({
      type: ADD_COMMENT_LIKE,
      payload: {
        data: post.data,
        postId,
        commentId
      }
    })
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data 
    })
  }
}

// Unlike Comment
export const removeCommentLike = (postId, commentId) => async dispatch => {
  try {
    const post = await axios.post(`/api/posts/comment/unlike/${postId}/${commentId}`)
    dispatch({
      type: REMOVE_COMMENT_LIKE,
      payload: {
        data: post.data,
        postId,
        commentId
      }
    })
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data 
    })
  }
}

// Add NestedComment 
export const addNestedComment = (postId, commentId, nestedCommentData) => async dispatch => {
  try {
    dispatch(clearErrors()) 
    const res = await axios.post(`/api/posts/comment/comment/${postId}/${commentId}`, nestedCommentData)
    dispatch({
      type: ADD_NESTED_COMMENT,
      payload: { data: res.data, postId, commentId, nestedCommentData }, 
    })
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data 
    })
  }
}

// Delete NestedComment
export const deleteNestedComment = (postId, commentId, nestedCommentId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/comment/comment/${postId}/${commentId}/${nestedCommentId}`)
    dispatch({
      type: REMOVE_NESTED_COMMENT,
      payload: { data: res.data, postId, commentId, nestedCommentId }
    })
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data 
    })
  }
}

// Like NestedComment
export const likeNestedComment = (postId, commentId, nestedCommentId) => async dispatch => {
  try {
    const res = await axios.post(`/api/posts/comment/comment/like/${postId}/${commentId}/${nestedCommentId}`)
    dispatch({
      type: ADD_NESTED_COMMENT_LIKE,
      payload: { data: res.data, postId, commentId, nestedCommentId }
    })
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data 
    })
  }
}

// Unlike NestedComment
export const unlikeNestedComment = (postId, commentId, nestedCommentId) => async dispatch => {
  try {
    const res = await axios.post(`/api/posts/comment/comment/unlike/${postId}/${commentId}/${nestedCommentId}`)
    dispatch({
      type: REMOVE_NESTED_COMMENT_LIKE,
      payload: { data: res.data, postId, commentId, nestedCommentId }
    })
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data 
    })
  }
}

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  }
}


// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}