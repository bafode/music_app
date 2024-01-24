import axios from 'axios'
import { logout } from './userActions'
import { SESSION_CREATE_FAIL, SESSION_CREATE_MUSIC_FAIL, SESSION_CREATE_MUSIC_REQUEST, SESSION_CREATE_MUSIC_SUCCESS, SESSION_CREATE_REQUEST, SESSION_CREATE_SUCCESS, SESSION_DELETE_FAIL, SESSION_DELETE_REQUEST, SESSION_DELETE_SUCCESS, SESSION_DETAILS_FAIL, SESSION_DETAILS_REQUEST, SESSION_DETAILS_SUCCESS, SESSION_LIST_FAIL, SESSION_LIST_REQUEST, SESSION_LIST_SUCCESS } from '../constants/sessionConstants'

export const listSessions = () => async (
  dispatch,getState
) => {
  try {
    dispatch({ type: SESSION_LIST_REQUEST })

    const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

    const { data } = await axios.get(
      `/sessions`,config
    )

    console.log(data)
    dispatch({
      type: SESSION_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SESSION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listSessionDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SESSION_DETAILS_REQUEST })

    const { data } = await axios.get(`/sessions/${id}`)

    dispatch({
      type: SESSION_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SESSION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteSession = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SESSION_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/sessions/${id}`, config)

    dispatch({
      type: SESSION_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: SESSION_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createSession = (moduleName,expirationDate) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SESSION_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/sessions`, {moduleName,expirationDate}, config)

    dispatch({
      type: SESSION_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    console.log(error)
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: SESSION_CREATE_FAIL,
      payload: message,
    })
  }
}

export const addMusicToSession = (sessionId, music) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: SESSION_CREATE_MUSIC_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.put(`/sessions/${sessionId}/reviews`, music, config)

    dispatch({
      type: SESSION_CREATE_MUSIC_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: SESSION_CREATE_MUSIC_FAIL,
      payload: message,
    })
  }
}
