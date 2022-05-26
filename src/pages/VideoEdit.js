import { useState, React, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { deleteVideo, editVideo, getVideoWithId } from '../axios/axios'
import styled from 'styled-components'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 30%;
`

function VideoEdit() {
  const [video, setVideo] = useState({})
  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newHashtags, setNewHashtags] = useState('')
  const [loading, setLoading] = useState(true)
  let { id } = useParams()
  let navigate = useNavigate()
  let payload = {
    id,
    title: newTitle,
    description: newDesc,
    hashtags: newHashtags,
  }

  useEffect(() => {
    getVideo()
  }, [])

  const getVideo = async () => {
    const { data } = await getVideoWithId({ id })
    setVideo(data)
    setNewTitle(data.title)
    setNewDesc(data.description)
    setNewHashtags(
      data.hashtags
        .map((item) => {
          return item.substr(1)
        })
        .join(',')
    )
    setLoading(false)
  }
  const handleEditVideo = async (e) => {
    e.preventDefault()
    const { data } = await editVideo(JSON.stringify(payload))
    if (data.result === 'success') {
      alert(data.result)
      navigate(`/video/${id}`)
    } else {
      alert(data.message)
    }
  }
  const handleDeleteVideo = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const { data } = await deleteVideo(JSON.stringify({ id }))
      if (data.result === 'success') {
        alert(data.result)
        navigate('/')
      }
    }
  }

  return (
    <div>
      {loading ? (
        'Loading...'
      ) : (
        <>
          <h1>Editing {video.title}</h1>
          <StyledForm onSubmit={handleEditVideo}>
            <label htmlFor="newTitle">제목</label>
            <input
              id="newTitle"
              type="text"
              value={newTitle}
              onChange={(e) => {
                setNewTitle(e.target.value)
              }}
            />
            <label htmlFor="newDesc">내용</label>
            <input
              id="newDesc"
              type="text"
              value={newDesc}
              onChange={(e) => {
                setNewDesc(e.target.value)
              }}
            />
            <label htmlFor="newHashtags">해시태그</label>
            <input
              id="newHashtags"
              type="text"
              value={newHashtags}
              onChange={(e) => {
                setNewHashtags(e.target.value)
              }}
            />
            <button type="submit">수정</button>
          </StyledForm>
          <button type="button" onClick={handleDeleteVideo}>
            비디오 삭제
          </button>
        </>
      )}
    </div>
  )
}

export default VideoEdit
