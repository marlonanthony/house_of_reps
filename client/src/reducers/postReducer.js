import { 
  ADD_POST, 
  GET_POSTS,
  POST_LOADING, 
  DELETE_POST, 
  DELETE_COMMENT,
  ADD_COMMENT,
  GET_POST,
  GET_MORE_POSTS,
  ADD_NESTED_COMMENT,
  REMOVE_NESTED_COMMENT,
  ADD_LIKE,
  REMOVE_LIKE,
  ADD_COMMENT_LIKE,
  REMOVE_COMMENT_LIKE,
  ADD_NESTED_COMMENT_LIKE,
  REMOVE_NESTED_COMMENT_LIKE
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
    
    case GET_MORE_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
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

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload) 
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

    case ADD_COMMENT_LIKE:
      const updateCommentLikes = state.posts.map(post => {
        if(post._id === action.payload.postId) {
          post.comments.forEach(comment => {
            if(comment._id === action.payload.commentId) {
              post = action.payload.data
            }
          })
        } 
        return post
      })
      return {
        ...state,
        posts: updateCommentLikes,
        loading: false 
      }


    case REMOVE_COMMENT_LIKE:
      const removeCommentLike = state.posts.map(post => {
        if(post._id === action.payload.postId) {
          post.comments.forEach(comment => {
            if(comment._id === action.payload.commentId) {
              post = action.payload.data
            }
          })
        }
        return post 
      })
      return {
        ...state,
        posts: removeCommentLike,
        loading: false
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
          post.comments.forEach(comment => {
            if(comment._id === action.payload.commentId) {
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

    case REMOVE_NESTED_COMMENT:
      const updateRomoveNestedCommentPosts = state.posts.map(post => {
        if(post._id === action.payload.postId) {
          post.comments.forEach(comment => {
            if(comment._id === action.payload.commentId) {
              comment.comments.filter(nestedComment => nestedComment._id !== action.payload.nestedCommentId) 
              post = action.payload.data
            }
          })
        }
          return post 
      })
      return {
        ...state,
        posts: updateRomoveNestedCommentPosts,
        loading: false 
      }

    case ADD_NESTED_COMMENT_LIKE:
      const updateNestedCommentLikes = state.posts.map(post => {
        if(post._id === action.payload.postId) {
          post.comments.forEach(comment => {
            if(comment._id === action.payload.commentId) {
              comment.comments.forEach(nestedComment => {
                if(nestedComment._id === action.payload.nestedCommentId) {
                  post = action.payload.data
                }
              })
            }
          })
        }
        return post 
      })
      return {
        ...state,
        posts: updateNestedCommentLikes,
        loading: false 
      }

    case REMOVE_NESTED_COMMENT_LIKE:
      const removeNestedCommentLike = state.posts.map(post => {
        if(post._id === action.payload.postId) {
          post.comments.forEach(comment => {
            if(comment._id === action.payload.commentId) {
              comment.comments.forEach(nestedComment => {
                if(nestedComment._id === action.payload.nestedCommentId) {
                  post = action.payload.data 
                }
              })
            }
          })
        }
        return post 
      })
      return {
        ...state,
        posts: removeNestedCommentLike,
        loading: false 
      }

    default: 
      return state 
  }
}