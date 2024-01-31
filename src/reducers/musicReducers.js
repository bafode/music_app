
import { 
  MUSIC_CREATE_FAIL,
  MUSIC_CREATE_RESET, 
  MUSIC_CREATE_REQUEST, 
  MUSIC_CREATE_SUCCESS, 
  MUSIC_CREATE_VOTE_FAIL, 
  MUSIC_CREATE_VOTE_REQUEST, 
  MUSIC_CREATE_VOTE_SUCCESS,
  MUSIC_DELETE_REQUEST, 
  MUSIC_DELETE_SUCCESS, 
  MUSIC_DETAILS_FAIL, 
  MUSIC_DETAILS_REQUEST, 
  MUSIC_DETAILS_SUCCESS, 
  MUSIC_LIST_FAIL, 
  MUSIC_LIST_REQUEST, 
  MUSIC_LIST_SUCCESS, 
  MUSIC_TOP_FAIL, 
  MUSIC_TOP_REQUEST, 
  MUSIC_TOP_SUCCESS, 
  MUSIC_UPDATE_FAIL, 
  MUSIC_UPDATE_REQUEST, 
  MUSIC_UPDATE_SUCCESS, 
  MUSIC_UPDATE_RESET, 
  MUSIC_CREATE_VOTE_RESET, 
  MUSIC_SEARCH_REQUEST, 
  MUSIC_SEARCH_SUCCESS, 
  MUSIC_SEARCH_FAIL, 
  MUSIC_SEARCH_RESET 
} from '../constants/musicConstants'

  
  export const musicListReducer = (state = { musics: [] }, action) => {
    switch (action.type) {
      case MUSIC_LIST_REQUEST:
        return { loading: true, musics: [] }
      case MUSIC_LIST_SUCCESS:
        return {
          loading: false,
          musics: action.payload.musics,
          pages: action.payload.pages,
          page: action.payload.page,
        }
      case MUSIC_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const musicDetailsReducer = (
    state = {music:{vites:[]}},
    action
  ) => {
    switch (action.type) {
      case MUSIC_DETAILS_REQUEST:
        return { ...state, loading: true }
      case MUSIC_DETAILS_SUCCESS:
        return { loading: false, music: action.payload }
      case MUSIC_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const musicDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case MUSIC_DELETE_REQUEST:
        return { loading: true }
      case MUSIC_DELETE_SUCCESS:
        return { loading: false, success: true }
      case MUSIC_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const musicCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case MUSIC_CREATE_REQUEST:
        return { loading: true }
      case MUSIC_CREATE_SUCCESS:
        return { loading: false, success: true, music: action.payload }
      case MUSIC_CREATE_FAIL:
        return { loading: false, error: action.payload }
      case MUSIC_CREATE_RESET:
        return {}
      default:
        return state
    }
  }
  
  export const musicUpdateReducer = (state = { music: {} }, action) => {
    switch (action.type) {
      case MUSIC_UPDATE_REQUEST:
        return { loading: true }
      case MUSIC_UPDATE_SUCCESS:
        return { loading: false, success: true, music: action.payload }
      case MUSIC_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case MUSIC_UPDATE_RESET:
        return { music: {} }
      default:
        return state
    }
  }
  
  export const musicVoteCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case MUSIC_CREATE_VOTE_REQUEST:
        return { loading: true }
      case MUSIC_CREATE_VOTE_SUCCESS:
        return { loading: false, success: true }
      case MUSIC_CREATE_VOTE_FAIL:
        return { loading: false, error: action.payload }
      case MUSIC_CREATE_VOTE_RESET:
        return {}
      default:
        return state
    }
  }
  
  export const musicTopRatedReducer = (state = { musics: [] }, action) => {
    switch (action.type) {
      case MUSIC_TOP_REQUEST:
        return { loading: true, musics: [] }
      case MUSIC_TOP_SUCCESS:
        return { loading: false, musics: action.payload }
      case MUSIC_TOP_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const musicSearchReducer = (state = { results: [] }, action) => {
    switch (action.type) {
      case MUSIC_SEARCH_REQUEST:
        return { loading: true, results: [] }
      case MUSIC_SEARCH_SUCCESS:
        return {
          loading: false,
          results: action.payload.results,
        }
      case MUSIC_SEARCH_FAIL:
        return { loading: false, error: action.payload }
      case MUSIC_SEARCH_RESET:
          return { loading: false, results: []}
      default:
        return state
    }
  }