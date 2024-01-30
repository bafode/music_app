import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { SESSION_CREATE_RESET } from '../constants/sessionConstants'
import {deleteSession,listSessions } from '../actions/sessionActions'

const SessionListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const sessionList = useSelector((state) => state.sessionList)
  const { loading, error, sessions } = sessionList

  const sessionDelete = useSelector((state) => state.sessionDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = sessionDelete


  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: SESSION_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    dispatch(listSessions())
   
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteSession(id))
    }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Sessions</h1>
        </Col>
        <Col className='text-right'>
          <LinkContainer to={`/createSession`}>
            <Button className='my-3' >
                <i className='fas fa-plus'></i> Create Session
            </Button>
          </LinkContainer>
        </Col>
      </Row>
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
              <th>MODULE_NAME</th>
              <th>EXPIRATION DATE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sessions?.map((session) => (
              <tr key={session._id}>
                <td>{session._id}</td>
                <td>{session.moduleName}</td>
                <td>{session.expirationDate}</td>
                <td>
                   <LinkContainer to={`/session/${session._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(session._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
      )}
      
    </>
  )
}

export default SessionListScreen