import React from 'react'
import Thumbnail from './Thumbnail'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
`

function ThumbnailContainer(props) {
  return (
    <Container>
      <Thumbnail videoObj={props.videoObj} />
    </Container>
  )
}

export default ThumbnailContainer
