import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import { addMusicToSessionReducer, sessionCreateReducer, sessionDeleteReducer, sessionDetailsReducer, sessionListReducer, sessionUpdateReducer } from './reducers/sessionReducers'
import { musicCreateReducer, musicDeleteReducer, musicDetailsReducer, musicListReducer, musicSearchReducer, musicTopRatedReducer, musicUpdateReducer, musicVoteCreateReducer } from './reducers/musicReducers'


const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  sessionList:sessionListReducer,
  sessionDetails:sessionDetailsReducer,
  sessionDelete:sessionDeleteReducer,
  sessionCreate:sessionCreateReducer,
  sessionUpdate:sessionUpdateReducer,
  addMusicToSession:addMusicToSessionReducer,
  musicList: musicListReducer,
  musicSearch: musicSearchReducer,
  musicDetails: musicDetailsReducer,
  musicDelete: musicDeleteReducer,
  musicCreate: musicCreateReducer,
  musicUpdate: musicUpdateReducer,
  musicVoteCreate: musicVoteCreateReducer,
  musicTopRated: musicTopRatedReducer,
})



const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null


const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store