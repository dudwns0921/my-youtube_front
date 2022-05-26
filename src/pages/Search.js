import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { searchVideo } from '../axios/axios'
import Thumbnail from '../components/Thumbnail'

function Search() {
  const { keyword } = useParams()
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const getVideosWithKeyword = async () => {
    const { data } = await searchVideo({ keyword })
    setVideos(data.videos)
    setLoading(false)
  }
  useEffect(() => {
    getVideosWithKeyword()
  }, [])
  return (
    <div>
      {loading ? (
        'Loading...'
      ) : (
        <>
          <h1>검색 결과</h1>
          {videos.map((video) => {
            return <Thumbnail key={video.createdAt} videoObj={video} />
          })}
        </>
      )}
    </div>
  )
}

export default Search
