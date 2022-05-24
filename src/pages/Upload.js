import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { uploadVideo } from '../axios/axios'
import { getUserFromCookie } from '../utils/cookie'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 30%;
`

function Upload() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState('')
  const [videoFile, setVideoFile] = useState('')
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [hashtags, setHashtags] = useState('')
  useEffect(() => {
    setUserData(JSON.parse(getUserFromCookie()))
  })

  const handleUploadVideo = async (e) => {
    e.preventDefault()
    let videoData = new FormData()
    videoData.append('title', title)
    videoData.append('description', desc)
    videoData.append('hashtags', hashtags)
    videoData.append('videoFile', videoFile)
    videoData.append('ownerId', userData.id)

    const { data } = await uploadVideo(videoData)
    if (data.result === 'success') {
      alert(data.result)
      navigate('/')
    }
  }
  return (
    <div>
      <StyledForm onSubmit={handleUploadVideo}>
        <label htmlFor="videoFile">비디오</label>
        <input
          id="videoFile"
          type="file"
          accept="video/*"
          required
          onChange={(e) => {
            setVideoFile(e.target.files[0])
          }}
        />
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          required
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
        <label htmlFor="desc">내용</label>
        <input
          id="desc"
          type="text"
          required
          onChange={(e) => {
            setDesc(e.target.value)
          }}
        />
        <label htmlFor="hashtags">해시태그</label>
        <input
          id="hashtags"
          type="text"
          required
          placeholder="Hashtags, separated by comma"
          onChange={(e) => {
            setHashtags(e.target.value)
          }}
        />
        <input type="submit" value="전송" />
      </StyledForm>
    </div>
  )
}

export default Upload
