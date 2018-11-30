import { 
  ADD_POST, 
  GET_POSTS,
  POST_LOADING, 
  DELETE_POST, 
  // DELETE_COMMENT,
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
      let updatedPost = posts.map((val, i, arr) => {
        if(val._id === action.payload._id) {
          val = action.payload
        }
        return val
      })
  
      return {
        ...state,
        posts: updatedPost,
        loading: false
        // post: posts.map((val, i, arr)  => {
        //   console.log(val._id)
        //   console.log(action.payload._id) 
        //   if(val._id === action.payload._id){
        //     val = action.payload 
        //     console.log(val) 
        //   }
        //   console.log(val)
        //   console.log(arr)
        //   return val
        // }),
        // post: [action.payload.comments[0], state.post.comments ],
        // post: action.payload._id === state.post._id ? state.post.comments.unshift(action.payload.comments[0]) : state,
        // posts: [ action.payload, ...state.posts ],
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload) 
      }
    // case DELETE_COMMENT: 
    //   return {
    //     ...state,
    //     posts: state.posts.map(post => post.comments.filter(comment => comment._id !== action.payload.commentId))
    //   }
    default: 
      return state 
  }
}