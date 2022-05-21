import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getVideos } from '../axios/axios'
import { formatDate } from '../utils/utils'
import _ from 'lodash'

function Home() {
  useEffect(() => {
    getAllVideos()
  }, [])
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const getAllVideos = async () => {
    const { data } = await getVideos()
    _.sortBy(data, ['createdAt'])
    setVideos(data)
    setLoading(false)
  }

  return (
    <div>
      {loading
        ? 'Loading...'
        : videos.length > 0
        ? videos.map((video) => {
            return (
              <div key={video.createdAt}>
                <Link to={`video/${video._id}`}>{video.title}</Link>
                <h2>{formatDate(video.createdAt)}</h2>
                <h2>{video.hashtags}</h2>
                <h2>{video.meta.views}</h2>
                <p>{video.description}</p>
              </div>
            )
          })
        : 'No Videos'}
    </div>
  )
}

export default Home
