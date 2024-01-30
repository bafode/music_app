import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Music = ({ music }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/musics/${music._id}`}>
        <Card.Img 
        src='/images.png' 
        variant='top'
         />
      </Link>

      <Card.Body>
        <Link to={`/musics/${music._id}`}>
          <Card.Title as='div'>
            <strong>{music.title}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
           <Card.Text as='h5'>Artists:</Card.Text>
           {music.artist.map((art)=>(<Card.Text as='h6' key={art}>{art}</Card.Text>))}
        </Card.Text>
        
       
        
        <Card.Text as='div'>
          <Rating
            value={music.rating}
            text={`${music.numVote} votes`}
          />
        </Card.Text>
        
      </Card.Body>
    </Card>
  )
}

export default Music