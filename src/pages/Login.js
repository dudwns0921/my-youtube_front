import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { githubLogin, loginUser } from '../axios/axios'
import { saveTokenToCookie, saveUserToCookie } from '../utils/cookie'
import { useNavigate, useLocation } from 'react-router-dom'
import qs from 'qs'

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
  const navigate = useNavigate()
  const location = useLocation()

  let userData = {
    email,
    password,
  }

  const checkGithubLogin = async () => {
    const queryObj = qs.parse(location.search.substring(1))
    if (queryObj.code) {
      const { data } = await githubLogin(queryObj.code)
      console.log(data)
    }
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
    const { data } = await loginUser(JSON.stringify(userData))
    console.log(data)
    saveTokenToCookie(data.token)
    saveUserToCookie(JSON.stringify(data.user))
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <button type="button" onClick={checkGithubLogin}>
        깃허브 체크 시도
      </button>
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
