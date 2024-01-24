import axios from 'axios'
import React, { useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { createSession } from '../actions/sessionActions'
import { SESSION_CREATE_MUSIC_RESET } from '../constants/sessionConstants'
import Loader from '../components/Loader'
import Message from '../components/Message'


const CreateSessionScreen = ({history}) => {

  const [moduleName, setModuleName] = useState('')
  const [expirationDate, setExpirationDate] = useState("")

  const dispatch=useDispatch()

  const sessionCreate=useSelector((state)=>state.sessionCreate)

  const {
    loading,
    error,
    success,
  } = sessionCreate

  useEffect(() => {
    if (success) {
      dispatch({ type: SESSION_CREATE_MUSIC_RESET })
      history.push('/admin/sessionlist')
    }
  }, [dispatch, history,success])


  const submitHandler = (e) => {
    e.preventDefault()
    if(moduleName!==""&&expirationDate!==""){
      dispatch(createSession(moduleName,expirationDate))
    }
  }

  return (
    <>
      <Link to='/admin/sessionlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Session</h1>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}

          <Form onSubmit={submitHandler}>
            <Form.Group controlId='moduleName'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter module name'
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='expirationDate'>
              <Form.Label>expiration Date</Form.Label>
              <Form.Control
                type='date'
                placeholder='Enter expiration date'
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Create Session
            </Button>
          </Form>
      </FormContainer>
    </>
  )
}

export default CreateSessionScreen