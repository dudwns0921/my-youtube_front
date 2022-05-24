import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getVideoWithId } from '../axios/axios'
import { getUserFromCookie } from '../utils/cookie'

function Video() {
  let { id } = useParams()
  const navigate = useNavigate()
  const [userData, setUserData] = useState({})
  const [video, setVideo] = useState({})
  const [loading, setLoading] = useState(true)

  const getVideo = async (id) => {
    const { data } = await getVideoWithId({ id })
    if (data) {
      setVideo(data)
    } else {
      navigate('/404')
    }
  }
  useEffect(() => {
    getVideo(id)
    setUserData(JSON.parse(getUserFromCookie()))
    setLoading(false)
  }, [])

  return (
    <div>
      {loading ? (
        'Loading...'
      ) : (
        <>
          <h1>{video.title}</h1>
          <video
            src={`${process.env.REACT_APP_SERVER_BASE_URL}${video.videoURL}`}
            controls
          />
          {userData.id === video.ownerId ? (
            <Link to={`/videoEdit/${id}`}>Edit Video→</Link>
          ) : (
            ''
          )}
        </>
      )}
    </div>
  )
}

export default Video
