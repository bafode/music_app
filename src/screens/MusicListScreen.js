import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listMusics,
  deleteMusic,
} from '../actions/musicActions'

const MusicListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const musicList = useSelector((state) => state.musicList)
  const { loading, error, musics} = musicList

  const musicDelete = useSelector((state) => state.musicDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = musicDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }
    dispatch(listMusics('','', pageNumber))
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteMusic(id))
    }
  }

  return (
    <>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>LINK</th>
                <th>ARTISTS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {musics.map((music) => (
                <tr key={music._id}>
                  <td>{music._id}</td>
                  <td>{music.title}</td>
                  <td>{music.link}</td>
                  <td>{music.artist.map((a)=>(<div>{a}</div>))}</td>
                  <td>
                    <LinkContainer to={`/musics/${music._id}`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(music._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
        </>
      )}
    </>
  )
}

export default MusicListScreen