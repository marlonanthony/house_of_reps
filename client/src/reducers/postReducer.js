import { 
  ADD_POST, 
  GET_POSTS,
  POST_LOADING, 
  DELETE_POST, 
  DELETE_COMMENT,
  ADD_COMMENT,
  GET_POST,
  GET_MORE_POSTS,
  GET_MATCHING_POSTS,
  ADD_NESTED_COMMENT,
  GET_PROFILE_POSTS,
  GET_MORE_PROFILE_POSTS,
  GET_LIKED_POSTS,
  GET_MORE_LIKED_POSTS,
  ADD_LIKE,
  REMOVE_LIKE
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

    case GET_LIKED_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false 
      }
    
    case GET_MORE_LIKED_POSTS:
      return {
        ...state,
        posts: [ ...state.posts, ...action.payload ],
        loading: false 
      }

    case GET_PROFILE_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      }

    case GET_MORE_PROFILE_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        loading: false
      }
    
    case GET_MORE_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        loading: false 
      }

    case GET_MATCHING_POSTS:
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

    case ADD_LIKE:
      const updatePostsLikes = state.posts.map(post => {
        if(post._id === action.payload._id) {
          post = action.payload 
        } 
        return post 
      })
      return {
        ...state,
        posts: updatePostsLikes,
        loading: false 
      }

    case REMOVE_LIKE:
      const updatePostRemoveLikes = state.posts.map(post => {
        if(post._id === action.payload._id) {
          post = action.payload
        }
        return post 
      })
      return {
        ...state,
        posts: updatePostRemoveLikes,
        loading: false 
      }

    case ADD_COMMENT: 
      const { posts } = state 
      const updatedPost = posts.map(comment => {
        if(comment._id === action.payload._id) {
          comment = action.payload
        }
        return comment
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

    case ADD_NESTED_COMMENT:
      const updatePost = state.posts.map(post => {
        if(post._id === action.payload.postId) {
          post.comments.map(comment => {
            if(comment._id.toString() === action.payload.commentId) {
              post = action.payload.data
            }
          })
        }
        return post 
      })
    return {
      ...state,
      posts: updatePost,
      loading: false 
    }

    default: 
      return state 
  }
}