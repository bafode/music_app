import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Meta from '../components/Meta'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Button, Col, Row } from 'react-bootstrap'
import Music from '../components/Music'
import { listSessions } from '../actions/sessionActions'
import { LinkContainer } from 'react-router-bootstrap'
const HomeScreen = ({ match,history }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()
  

  const sessionList = useSelector((state) => state.sessionList)
  const {sessions,loading,error } = sessionList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin



  useEffect(()=>{
    
    if (userInfo) {
      dispatch(listSessions())
    } else {
      history.push('/login')
    }
  },[dispatch,keyword,pageNumber,userInfo])


  return (
    <>
      <Meta />
      {loading?(
        <Loader/>
      ):error?(
        <Message variant='danger'>{error}</Message>
      ):(
        <>
          {sessions.map((session)=>(
             <>
                
                <h1>{session.moduleName}</h1>
                 {session?.musics?.length === 0 && <Message>No Music Added Yet In This Session </Message>}
                <LinkContainer to={`/session/${session._id}/edit`}>
                  <Button variant='success' className='btn-sm'>
                        Edit or Add new Music to this Session<i className='fas fa-edit'></i>
                  </Button>
                </LinkContainer>
                
                <Row>
                {session?.musics
                  ?.sort((a, b) => b.rating - a.rating) 
                  .map((music) => (
                    <Col key={music._id} sm={12} md={6} lg={4} xl={3}>
                      <Music music={music} />
                    </Col>
                  ))}
            </Row>
             </>
              
            ))}
        </>
      )}     
    </>
  )
}

export default HomeScreen