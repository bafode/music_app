import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
//import Paginate from '../components/Paginate'
import {
  listMusics,
  deleteMusic,
  createMusic,
  listTopMusics
} from '../actions/musicActions'
import {MUSIC_CREATE_RESET } from '../constants/musicConstants'

const MusicListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const musicList = useSelector((state) => state.musicList)
  const { loading, error, musics, page, pages } = musicList

  const musicDelete = useSelector((state) => state.musicDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = musicDelete

  const musicCreate = useSelector((state) => state.musicCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    music: createdMusic,
  } = musicCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: MUSIC_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/music/${createdMusic._id}/edit`)
    } else {
      dispatch(listMusics('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdMusic,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteMusic(id))
    }
  }

  const createMusicHandler = () => {
    dispatch(createMusic())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Musics</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createMusicHandler}>
            <i className='fas fa-plus'></i> Create Music
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
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
                    <LinkContainer to={`/admin/music/${music._id}/edit`}>
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