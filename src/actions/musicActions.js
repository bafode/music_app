import axios from 'axios'

import { logout } from './userActions'
import { MUSIC_CREATE_FAIL, MUSIC_CREATE_REQUEST, MUSIC_CREATE_SUCCESS, MUSIC_CREATE_VOTE_FAIL, MUSIC_CREATE_VOTE_REQUEST, MUSIC_CREATE_VOTE_SUCCESS, MUSIC_DELETE_FAIL, MUSIC_DELETE_REQUEST, MUSIC_DELETE_SUCCESS, MUSIC_DETAILS_FAIL, MUSIC_DETAILS_REQUEST, MUSIC_DETAILS_SUCCESS, MUSIC_LIST_FAIL, MUSIC_LIST_REQUEST, MUSIC_LIST_SUCCESS, MUSIC_SEARCH_FAIL, MUSIC_SEARCH_REQUEST, MUSIC_SEARCH_SUCCESS, MUSIC_TOP_FAIL, MUSIC_TOP_REQUEST, MUSIC_TOP_SUCCESS, MUSIC_UPDATE_FAIL, MUSIC_UPDATE_REQUEST, MUSIC_UPDATE_SUCCESS } from '../constants/musicConstants'

export const listMusics = (search = '', session='All', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: MUSIC_LIST_REQUEST })

    const { data } = await axios.get(
      `http://127.0.0.1:5000/musics?search=${search}&session=${session}&pageNumber=${pageNumber}`
    )

    console.log(data)
    dispatch({
      type: MUSIC_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MUSIC_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listMusicDetails = (id) => async (dispatch,getState) => {
  try {
    dispatch({ type: MUSIC_DETAILS_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }


    const { data } = await axios.get(`http://127.0.0.1:5000/musics/${id}`,config)

    dispatch({
      type: MUSIC_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MUSIC_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteMusic = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MUSIC_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`http://127.0.0.1:5000/musics/${id}`, config)

    dispatch({
      type: MUSIC_DELETE_SUCCESS,
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
      type: MUSIC_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createMusic = (title,link,artist) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MUSIC_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`http://127.0.0.1:5000/musics`, {title,link,artist}, config)

    dispatch({
      type: MUSIC_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    console.log(error.response)
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: MUSIC_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateMusic = (music) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MUSIC_UPDATE_REQUEST,
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

    const { data } = await axios.put(
      `http://127.0.0.1:5000/musics/${music._id}`,
      music,
      config
    )

    dispatch({
      type: MUSIC_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: MUSIC_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: MUSIC_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const createMusicVote = (musicId, vote) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: MUSIC_CREATE_VOTE_REQUEST,
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

    await axios.post(`http://127.0.0.1:5000/musics/${musicId}/votes`, vote, config)

    dispatch({
      type: MUSIC_CREATE_VOTE_SUCCESS,
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
      type: MUSIC_CREATE_VOTE_FAIL,
      payload: message,
    })
  }
}

export const listTopMusics = () => async (dispatch) => {
  try {
    dispatch({ type: MUSIC_TOP_REQUEST })

    const { data } = await axios.get(`http://127.0.0.1:5000/musics/top`)
    console.log(data)
    dispatch({
      type: MUSIC_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MUSIC_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listMusicsFromSpotify = (search = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: MUSIC_SEARCH_REQUEST })

    const { data } = await axios.get(
      `http://127.0.0.1:5000/spotify?search=${search}`
    )
    dispatch({
      type: MUSIC_SEARCH_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MUSIC_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}