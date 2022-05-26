import React, { useEffect, useState } from 'react'
import { getVideos } from '../axios/axios'
import _ from 'lodash'
import Thumbnail from '../components/Thumbnail'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
`

function Home() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  const getAllVideos = async () => {
    const { data } = await getVideos()
    _.sortBy(data, ['createdAt'])
    setVideos(data)
    setLoading(false)
  }

  useEffect(() => {
    getAllVideos()
  }, [])
  return (
    <Container>
      {loading
        ? 'Loading...'
        : videos.length > 0
        ? videos.map((video) => {
            return <Thumbnail key={video.createdAt} videoObj={video} />
          })
        : 'No Videos'}
    </Container>
  )
}

export default Home
