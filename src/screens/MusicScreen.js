import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
  listMusicDetails,
  createMusicVote,
} from '../actions/musicActions'
import { MUSIC_CREATE_VOTE_RESET } from '../constants/musicConstants'

const MusicScreen = ({ match }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const musicDetails = useSelector((state) => state.musicDetails)
  const { loading, error, music } = musicDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const musicVoteCreate = useSelector((state) => state.musicVoteCreate)
  const {
    success: successMusicVote,
    loading: loadingMusicVote,
    error: errorMusicVote,
  } = musicVoteCreate

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createMusicVote(match.params.id, {
        rating,
        comment,
      })
    )

    dispatch({type: MUSIC_CREATE_VOTE_RESET})
  }


  useEffect(() => {
    if (successMusicVote) {
      setRating(0)
      setComment('')
      dispatch(listMusicDetails(match.params.id))
    }
    if (!music._id || music._id !== match.params.id) {
      dispatch(listMusicDetails(match.params.id))
      dispatch({ type: MUSIC_CREATE_VOTE_RESET })
    }
  }, [dispatch, match, successMusicVote])


 
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
        <h2>Music Details</h2>
        <Meta title={music.title} />
        <Row>
            <Col md={6}>
              <Image src="/images.png" alt={music.title} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{music.title}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div>
                  <h5>Artists:</h5>
                  {music?.artist?.map((art)=>(<h6 key={art}>{art}</h6>))}
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                <h5>Link</h5>
                  <a className='btn btn-light my-2' href={music.link} target="_blank"  rel="noreferrer">
                      <Button className='btn-sm' variant='info'>
                          Prelisteen Music
                      </Button>
                  </a>
                </ListGroup.Item>
                <ListGroup.Item>
                <h5>Votes</h5>
                  <Rating
                    value={music.rating}
                    text={`${music.numVote} votes`}
                  />
                </ListGroup.Item>  
              </ListGroup>
            </Col>
            </Row>
            <Row>
            <Col md={6}>
              <h2>Votes</h2>
              {music?.votes?.length === 0 && <Message>No Votes</Message>}
              <ListGroup variant='flush'>
                {music?.votes?.map((vote) => (
                  <ListGroup.Item key={vote._id}>
                    <strong>{vote.name}</strong>
                    <Rating value={vote.rating} />
                    <p>{vote.createdAt.substring(0, 10)}</p>
                    <p>{vote.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Vote as a Customer</h2>
                  {successMusicVote && (
                    <Message variant='success'>
                      Vote submitted successfully
                    </Message>
                  )}
                  {loadingMusicVote && <Loader />}
                  {errorMusicVote && (
                    <Message variant='danger'>{errorMusicVote}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingMusicVote}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row> 
          
        </>
      )}
    </>
  )
}

export default MusicScreen