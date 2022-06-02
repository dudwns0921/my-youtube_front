import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 0.2rem;
  img {
    width: 8rem;
    height: 5rem;
    border-radius: 1rem;
  }
  h2 {
    margin-top: 0.3rem;
    font-size: 0.5rem;
  }
`

function Thumbnail(props) {
  return (
    <div>
      <Wrapper>
        <Link to={`/video/${props.videoObj._id}`}>
          <img
            src={`${process.env.REACT_APP_SERVER_BASE_URL}static/images/defaultVideo.jpg`}
          ></img>
        </Link>
        <div>
          <h1>{props.videoObj.title}</h1>
          <h2>{props.videoObj.owner}</h2>
        </div>
      </Wrapper>
    </div>
  )
}

export default Thumbnail
