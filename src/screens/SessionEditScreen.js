import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Nav, ListGroup, Button, Form, Table } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import FormContainer from '../components/FormContainer'
import { addMusicToSessionAction, listSessionDetails } from '../actions/sessionActions'
import { MUSIC_CREATE_RESET, MUSIC_SEARCH_RESET } from '../constants/musicConstants'
import { createMusic, listMusicsFromSpotify } from '../actions/musicActions'
import { SESSION_CREATE_MUSIC_RESET } from '../constants/sessionConstants'
import Rating from '../components/Rating'
import { LinkContainer } from 'react-router-bootstrap'

const SessionEditScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')
  const [artist, setArtist] = useState([])
  const [message, setMessage] = useState(null)

  const sessionId = match.params.id

  const sessionDetails=useSelector((state)=>state.sessionDetails)
  const{loading,error,session}=sessionDetails

  const musicSearch = useSelector((state) => state.musicSearch)
  const {results,loading:loadingSearch,error:errorSearch } = musicSearch

  const addMusicToSession=useSelector((state)=>state.addMusicToSession)
  const{
    loading:loadingAddToSession,
    error:errorAddToSession,
    success:successAddToSession
   }=addMusicToSession

  
  const musicCreate=useSelector((state)=>state.musicCreate)

  const {
    loading:loadinMusicCreate,
    error:errorMusicCreate,
    success:succesMusicCreate,
    music
  } = musicCreate



 

  
  useEffect(() => {
    if (succesMusicCreate) {
      console.log(music._id)
      dispatch(addMusicToSessionAction(sessionId,music._id))
        dispatch({ type: MUSIC_CREATE_RESET });
        dispatch({ type: SESSION_CREATE_MUSIC_RESET });
        setTitle("")
        setLink('')
        setArtist([])
        dispatch(listSessionDetails(sessionId));  
    } else {
      if (!session?._id || session?._id !== sessionId) {
        dispatch(listSessionDetails(sessionId));
      }
    }
  }, [dispatch, history,succesMusicCreate]);
  


  const submitCreateMusicHandler = (e) => {
    e.preventDefault()
    if(title==='' || link===''){
      setMessage("All field are required")    
      }else{
        dispatch(createMusic(title,link,artist))
      }
  }

  const searchHandler = (search) => {
    if(search!==""){
     dispatch(listMusicsFromSpotify(search))
    }
   }

   const handleSelect = (music) => { 
    setTitle(music.title)
    setLink(music.link)
    setArtist(music.artist)
    dispatch({ type: MUSIC_SEARCH_RESET })
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
        <h1>{session?.moduleName}</h1>
        <p>expirationDate: {session?.expirationDate.substring(0, 10)}</p>
        <Meta title={session?.moduleName} />
        <Row>
            <Col md={6}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                <strong><h2>Track List</h2></strong>
                {session?.musics?.length === 0 && <Message>No Musics</Message>}
                <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>TITLE</th>
                    <th>ARTISTS</th>
                    <th>RATING</th>
                  </tr>
                </thead>
                <tbody>
                  {session?.musics
                ?.sort((a, b) => b.rating - a.rating) 
                .map((music) =>(
                    <LinkContainer to={`/musics/${music._id}`}>
                      <tr key={music._id}>
                      <td>{music.title}</td>
                      <td>{music?.artist?.map((a)=>(<div>{a}</div>))}</td>
                      <td>
                      <Rating
                        value={music?.rating}
                        text={`${music?.numVote} votes`}
                      />
                      </td>
                    </tr>
                    </LinkContainer>
                  ))}
                </tbody>
                </Table>
                </ListGroup.Item>  
              </ListGroup>
            </Col>
            <Col md={6}>
                  <h5>Add new Music to this Session</h5>
                  {message && <Message variant='danger'>{message}</Message>}
                  {loadingSearch && <Loader />}
                  {errorSearch && <Message variant='danger'>{errorSearch}</Message>}
                  {loadinMusicCreate&&loadingAddToSession&& <Loader />}
                  {errorMusicCreate &&errorAddToSession&& <Message variant='danger'>{errorMusicCreate}</Message>}
                  
                  <Form onSubmit={submitCreateMusicHandler}>
                    <Form.Group controlId='search'>
                    <Form.Control
                        type='text'
                        name='q'
                        onChange={(e) => searchHandler(e.target.value)}
                        placeholder='Search Music From Spotify...'
                    ></Form.Control>
                    </Form.Group>
                    {
                      <ul className="list">
                        {results?.length>0&&results?.map((music) => (
                          <li key={music.title} onClick={() => handleSelect(music)}>  
                            <Nav.Link>
                                {music.title.toUpperCase()} 
                            </Nav.Link>
                          </li>
                        ))}
                      </ul>
                    } 
                    <Form.Group controlId='title'>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type='title'
                        placeholder='Enter Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='link'>
                      <Form.Label>Music Link</Form.Label>
                      <Form.Control
                        type='link'
                        placeholder='Enter link'
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                      Add
                    </Button>
                  </Form>
            </Col>
            </Row>
          
        </>
      )}
    </>
  )
}

export default SessionEditScreen