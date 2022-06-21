import React, { useEffect, useState } from 'react'
import Thumbnail from './Thumbnail'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
`

function ThumbnailContainer(props) {
  return (
    <Container>
      <Thumbnail videoObj={props.videoObj} />
    </Container>
  )
}

export default ThumbnailContainer
