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
  GET_MATCHING_POSTS
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
  console.log(matches)
  dispatch(setPostLoading())
  axios.get(`/api/posts/search/:${matches}`)
  .then(res => dispatch({
    type: GET_MATCHING_POSTS,
    payload: res.data
  }))
  .catch(err => console.log(err)) 
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
  // .then(res => dispatch(getPosts()))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
}

// Remove Like
export const removeLike = id => dispatch => {
  axios.post(`/api/posts/unlike/${id}`)
  // .then(res => dispatch(getPosts()))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
}

// Add Comment 
// export const addComment = (postId, commentData) => dispatch => {
//   dispatch(clearErrors()) 
//   axios.post(`/api/posts/comment/${postId}`, commentData)
//   .then(res => dispatch(getPosts())) 
//   // posts: state.posts.map(post => post.comments.filter(comment => comment._id !== action.payload.commentId))
//   .catch(err => dispatch({
//     type: GET_ERRORS,
//     payload: err.response.data 
//   }))
// }
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
// export const addComment = (postId, commentData) => dispatch => {
//   dispatch(clearErrors()) 
//   axios.post(`/api/posts/comment/${postId}`, commentData)
//   .then(res => dispatch({
//     type: GET_POST,
//     payload: res.data 
//   })) 
//   .catch(err => dispatch({
//     type: GET_ERRORS,
//     payload: err.response.data 
//   }))
// }


// Delete Comment 
// export const deleteComment = (postId, commentId) => dispatch => {
//   axios.delete(`/api/posts/comment/${postId}/${commentId}`)
//   .then(res => dispatch({
//     type: DELETE_COMMENT,
//     payload: commentId
//   })) 
//   .catch(err => dispatch({
//     type: GET_ERRORS,
//     payload: err.response.data 
//   }))
// }
export const deleteComment = (postId, commentId) => dispatch => {
  axios.delete(`/api/posts/comment/${postId}/${commentId}`)
  .then(res => dispatch({
    type: DELETE_COMMENT,
    payload: {
      commentId,
      postId
    }
    // type: GET_POST,
    // payload: res.data 
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