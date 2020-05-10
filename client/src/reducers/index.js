import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import profileReducer from './profileReducer'
import postReducer from './postReducer'
import chatroomReducer from './chatroomReducer'
import promoReducer from './promoReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
  chatroom: chatroomReducer,
  promo: promoReducer
})
