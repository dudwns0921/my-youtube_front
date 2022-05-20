import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { searchVideo } from '../axios/axios'
import { formatDate } from '../utils/utils'

function Search() {
  const { keyword } = useParams()
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const getVideosWithKeyword = async () => {
    const { data } = await searchVideo(keyword)
    setVideos(data.videos)
    setLoading(false)
  }
  useEffect(() => {
    getVideosWithKeyword()
  }, []),
    []

  return (
    <div>
      {loading ? (
        'loading...'
      ) : (
        <>
          <h1>검색 결과</h1>
          {videos.map((video) => {
            return (
              <div key={video.createdAt}>
                <h1>{video.title}</h1>
                <h2>{formatDate(video.createdAt)}</h2>
                <h2>{video.hashtags}</h2>
                <h2>{video.meta.views}</h2>
                <p>{video.description}</p>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}

export default Search
