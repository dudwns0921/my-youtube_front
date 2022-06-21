import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  height: 90%;
  width: 30%;
  min-width: var(--component-thumbnail-min-width);
  min-height: var(--component-thumbnail-min-height);
  background-color: black;
  border-radius: 1rem;
`
const StyledLink = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  color: white;

  div:nth-child(1) {
    width: 100%;
    height: 100%;
    opacity: 0.2;
    background-image: url('http://localhost:4000/static/images/defaultVideo.png');
    background-position: center;
    background-size: cover;
  }

  div:nth-child(2) {
    position: absolute;
    bottom: 0;
    padding: 0.5rem;
    padding-top: 0;
    h1 {
      font-size: 2rem;
    }
  }
`

function Thumbnail(props) {
  return (
    <Container>
      <StyledLink to={`/video/${props.videoObj._id}`}>
        <div></div>
        <div>
          <h1>{props.videoObj.title}</h1>
          <h2>{props.videoObj.owner}</h2>
        </div>
      </StyledLink>
    </Container>
  )
}

export default Thumbnail
