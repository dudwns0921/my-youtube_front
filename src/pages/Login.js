import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../redux/slicer/isLoginSlice'
import { insert } from '../redux/slicer/userDataSlice'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { loginUser } from '../axios/axios'
import {
  getTokenFromCookie,
  saveTokenToCookie,
  saveUserToCookie,
} from '../utils/cookie'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 30%;
  button {
    a {
      text-decoration: none;
      color: black;
    }
  }
`
function Login() {
  const [email, setId] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let payload = {
    email,
    password,
  }

  const handleGithubLogin = () => {
    const baseUrl = 'https://github.com/login/oauth/authorize'
    const config = {
      client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
      allow_signup: false,
      scope: 'read:user user:email',
    }
    const params = new URLSearchParams(config).toString()
    window.location.replace(`${baseUrl}?${params}`)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data } = await loginUser(payload)
    if (data.result === 'success') {
      saveTokenToCookie(data.token)
      saveUserToCookie(JSON.stringify(data.userData))
      dispatch(insert(data.userData))
      if (getTokenFromCookie()) {
        dispatch(login())
        navigate('/')
      }
    }
  }
  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="email">아이디</label>
      <input
        id="email"
        type="text"
        onChange={(e) => {
          setId(e.target.value)
        }}
      />
      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value)
        }}
      />
      <button type="submit">로그인</button>
      <button type="button" onClick={handleGithubLogin}>
        Continue with github
      </button>
    </StyledForm>
  )
}

export default Login
