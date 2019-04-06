import axios from 'axios' 
import { 
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  ADD_COMMENT,
  GET_POST,
  CLEAR_ERRORS,
  DELETE_COMMENT,
  GET_MORE_POSTS,
  GET_MATCHING_POSTS,
  ADD_NESTED_COMMENT,
  REMOVE_NESTED_COMMENT,
  GET_PROFILE_POSTS,
  GET_MORE_PROFILE_POSTS,
  GET_LIKED_POSTS,
  GET_MORE_LIKED_POSTS, 
  ADD_LIKE,
  REMOVE_LIKE,
  ADD_COMMENT_LIKE,
  REMOVE_COMMENT_LIKE,
  ADD_NESTED_COMMENT_LIKE,
  REMOVE_NESTED_COMMENT_LIKE
} from './types' 

// Add Post 
export const addPost = postData => dispatch => {
  dispatch(clearErrors()) 
  axios.post('/api/posts', postData)
  .then(res => dispatch({
    type: ADD_POST,
    payload: res.data 
  })) 
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data 
  }))
}

// Get Posts 
export const getPosts = (count, start) => dispatch => {
  dispatch(setPostLoading()) 
  axios.get(`/api/posts?page=${start}&limit=${count}`)
  .then(res => dispatch({
    type: GET_POSTS,
    payload: res.data 
  })) 
  .catch(err => dispatch({
    type: GET_POSTS,
    payload: null
  }))
}

// Get Post 
export const getPost = (id) => dispatch => {
  dispatch(setPostLoading()) 
  axios.get(`/api/posts/${id}`)
  .then(res => dispatch({
    type: GET_POST,
    payload: res.data 
  })) 
  .catch(err => dispatch({
    type: GET_POST,
    payload: null
  }))   
}


// Get Liked Posts 
export const getLikedPosts = (count, start) => dispatch => {
  dispatch(setPostLoading()) 
  axios.get(`/api/posts/likedposts?page=${start}&limit=${count}`)
  .then(res => dispatch({
    type: GET_LIKED_POSTS,
    payload: res.data 
  }))
  .catch(err => console.log(err)) 
}

// Get More Liked Posts 
export const getMoreLikedPosts = (count, start) => dispatch => {
  dispatch(setPostLoading()) 
  axios.get(`/api/posts/likedposts?page=${start}&limit=${count}`)
  .then(res => dispatch({
    type: GET_MORE_LIKED_POSTS,
    payload: res.data 
  }))
  .catch(err => console.log(err)) 
}


// Get Profile Posts 
export const getProfilePosts = (count, start, handle) => dispatch => {
  dispatch(setPostLoading()) 
  axios.get(`/api/posts/profileposts?page=${start}&limit=${count}&handle=${handle}`)
  .then(res => dispatch({
    type: GET_PROFILE_POSTS,
    payload: res.data 
  })) 
  .catch(err => dispatch({
    type: GET_PROFILE_POSTS,
    payload: null
  }))
}

// Get More Profile Posts
export const getMoreProfilePosts = (count, start, handle) => dispatch => {
  dispatch(setPostLoading())
  axios.get(`/api/posts/profileposts?page=${start}&limit=${count}`)
  .then(res => dispatch({
    type: GET_MORE_PROFILE_POSTS,
    payload: res.data,
  }))
  .catch(err => console.log(err)) 
}

// Get More Posts
export const getMorePosts = (count, start) => dispatch => {
  dispatch(setPostLoading())
  axios.get(`/api/posts?page=${start}&limit=${count}`)
  .then(res => dispatch({
    type: GET_MORE_POSTS,
    payload: res.data
  }))
  .catch(err => console.log(err)) 
}

// Get Matching Posts
export const getMatchingPosts = (matches) => dispatch => {
  dispatch(setPostLoading())
  axios.get(`/api/posts/search/:${matches}`)
  .then(res => dispatch({
    type: GET_MATCHING_POSTS,
    payload: res.data
  }))
  .catch(err => console.log(err)) 
}


// Delete Post 
export const deletePost = id => dispatch => {
  axios.delete(`/api/posts/${id}`)
  .then(res => dispatch({
    type: DELETE_POST,
    payload: id
  })) 
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data 
  }))
}

// Add Like
export const addLike = id => dispatch => {
  axios.post(`/api/posts/like/${id}`)
  .then(post => dispatch({
    type: ADD_LIKE,
    payload: post.data 
  }))  
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
}

// Remove Like
export const removeLike = id => dispatch => {
  axios.post(`/api/posts/unlike/${id}`)
  .then(post => dispatch({
    type: REMOVE_LIKE,
    payload: post.data 
  }))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
}

// Add Comment to Post 
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors()) 
  axios.post(`/api/posts/comment/${postId}`, commentData)
  .then(res => dispatch({
    type: ADD_COMMENT,
    payload: res.data, 
  })) 
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data 
  }))
}

// Delete comment from post 
export const deleteComment = (postId, commentId) => dispatch => {
  axios.delete(`/api/posts/comment/${postId}/${commentId}`)
  .then(res => dispatch({
    type: DELETE_COMMENT,
    payload: { commentId, postId }
  })) 
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data 
  }))
}

// Add Like to Comment
export const addCommentLike = (postId, commentId) => dispatch => {
  axios.post(`/api/posts/comment/like/${postId}/${commentId}`)
  .then(post => dispatch({
    type: ADD_COMMENT_LIKE,
    payload: {
      data: post.data,
      postId,
      commentId
    }
  }))  
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data 
  }))
}

// Unlike Comment
export const removeCommentLike = (postId, commentId) => dispatch => {
  axios.post(`/api/posts/comment/unlike/${postId}/${commentId}`)
  .then(post => dispatch({
    type: REMOVE_COMMENT_LIKE,
    payload: {
      data: post.data,
      postId,
      commentId
    }
  }))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data 
  }))
}

// Add NestedComment 
export const addNestedComment = (postId, commentId, nestedCommentData) => dispatch => {
  dispatch(clearErrors()) 
  axios.post(`/api/posts/comment/comment/${postId}/${commentId}`, nestedCommentData)
  .then(res => dispatch({
    type: ADD_NESTED_COMMENT,
    payload: { data: res.data, postId, commentId, nestedCommentData }, 
  })) 
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data 
  }))
}

// Delete NestedComment
export const deleteNestedComment = (postId, commentId, nestedCommentId) => dispatch => {
  axios.delete(`/api/posts/comment/comment/${postId}/${commentId}/${nestedCommentId}`)
  .then(res => dispatch({
    type: REMOVE_NESTED_COMMENT,
    payload: { data: res.data, postId, commentId, nestedCommentId }
  }))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data 
  }))
}

// Like NestedComment
export const likeNestedComment = (postId, commentId, nestedCommentId) => dispatch => {
  axios.post(`/api/posts/comment/comment/like/${postId}/${commentId}/${nestedCommentId}`)
  .then(res => dispatch({
    type: ADD_NESTED_COMMENT_LIKE,
    payload: { data: res.data, postId, commentId, nestedCommentId }
  }))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data 
  }))
}

// Unlike NestedComment
export const unlikeNestedComment = (postId, commentId, nestedCommentId) => dispatch => {
  axios.post(`/api/posts/comment/comment/unlike/${postId}/${commentId}/${nestedCommentId}`)
  .then(res => dispatch({
    type: REMOVE_NESTED_COMMENT_LIKE,
    payload: { data: res.data, postId, commentId, nestedCommentId }
  }))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data 
  }))
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