import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { uploadVideo } from '../axios/axios'
import { useSelector } from 'react-redux'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 35rem;
  background-color: white;
  padding: 3rem;
  label {
    margin-bottom: 0.5rem;
  }
  input {
    margin-bottom: 1rem;
  }
  input[type='text'] {
    padding: 1rem;
    border: none;
    background-color: #f2f2f2;
    height: 4rem;
    &:focus {
      outline: none;
    }
  }
  button {
    color: white;
    border: none;
    cursor: pointer;
    height: 4rem;
    background-color: var(--app-main-color);
    &:disabled {
      opacity: 0.2;
    }
  }
`

function Upload() {
  const userData = useSelector((state) => state.userData.value)
  const navigate = useNavigate()
  const [videoFile, setVideoFile] = useState('')
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [hashtags, setHashtags] = useState('')

  const handleUploadVideo = async (e) => {
    e.preventDefault()
    let videoData = new FormData()
    videoData.append('title', title)
    videoData.append('description', desc)
    videoData.append('hashtags', hashtags)
    videoData.append('videoFile', videoFile)
    videoData.append('owner', userData.username)

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
          required
          accept="video/*"
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
        <button type="submit">업로드</button>
      </StyledForm>
    </div>
  )
}

export default Upload
