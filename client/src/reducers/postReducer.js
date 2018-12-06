import { 
  ADD_POST, 
  GET_POSTS,
  POST_LOADING, 
  DELETE_POST, 
  DELETE_COMMENT,
  ADD_COMMENT,
  GET_POST 
} from '../actions/types'

const initialState = { 
  posts: [],
  post: {},
  loading: false 
}

export default function(state = initialState, action) {
  switch(action.type) {
    case POST_LOADING: 
      return {
        ...state,
        loading: true 
      }

    case GET_POSTS: 
      return {
        ...state,
        posts: action.payload,
        loading: false 
      }

    case GET_POST: 
      return {
        ...state,
        post: action.payload,
        loading: false 
      }

    case ADD_POST: 
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      }

    case ADD_COMMENT: 
      const { posts } = state 
      const updatedPost = posts.map(val => {
        if(val._id === action.payload._id) {
          val = action.payload
        }
        return val
      })
      return {
        ...state,
        posts: updatedPost,
        loading: false
      }

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload) 
      }

    case DELETE_COMMENT: 
      const selectedPost = state.posts.filter(post => post._id === action.payload.postId)[0].comments.filter(val => val._id !== action.payload.commentId)
      const newerComment = state.posts.map(post => {
        if(post._id === action.payload.postId) {
          post.comments = selectedPost
        }
        return post 
      })
      return {
        ...state,
        posts: newerComment
      }
    default: 
      return state 
  }
}