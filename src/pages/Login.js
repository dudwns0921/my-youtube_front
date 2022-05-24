import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import styled from 'styled-components'
import { loginUser } from '../axios/axios'
import {
  getTokenFromCookie,
  getUserFromCookie,
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
  const OutletContext = useOutletContext()
  const setIsLogin = OutletContext[0]
  // Redux 대신 props로 state와 setState를 전달
  const [email, setId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  let userData = {
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
    const { data } = await loginUser(userData)
    if (data.result === 'success') {
      saveTokenToCookie(data.token)
      saveUserToCookie(JSON.stringify(data.user))
      if (getTokenFromCookie() && getUserFromCookie()) {
        setIsLogin(true)
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
        type="text"
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
