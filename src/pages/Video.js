import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getVideoWithId } from '../axios/axios'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const Wrapper = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
`

function Video() {
  let { id } = useParams()
  const userData = useSelector((state) => state.userData.value)
  const [video, setVideo] = useState({})
  const [loading, setLoading] = useState(true)

  const getVideo = async () => {
    const { data } = await getVideoWithId({ id })
    if (data) {
      setVideo(data)
    }
  }
  useEffect(() => {
    getVideo()
    setLoading(false)
  }, [])

  return (
    <div>
      {loading ? (
        'Loading...'
      ) : (
        <Wrapper>
          <h1>{video.title}</h1>
          <h1 style={{ color: 'blue' }}>{video.hashtags}</h1>
          <video
            src={`${process.env.REACT_APP_SERVER_BASE_URL}${video.videoURL}`}
            controls
          />
          {userData.id === video.ownerId ? (
            <Link to={`/videoEdit/${id}`}>Edit Video→</Link>
          ) : (
            ''
          )}
        </Wrapper>
      )}
    </div>
  )
}

export default Video
