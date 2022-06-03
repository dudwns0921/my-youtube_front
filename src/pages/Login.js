import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../redux/slicer/isLoginSlice'
import { insert } from '../redux/slicer/userDataSlice'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import { loginUser } from '../axios/axios'
import {
  getTokenFromCookie,
  saveTokenToCookie,
  saveUserToCookie,
} from '../utils/cookie'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3rem;
  width: 30%;
  height: 50%;
  min-width: 35rem;
  min-height: 25rem;
  background-color: white;
  input {
    padding: 1rem;
    border: none;
    background-color: #f2f2f2;
    height: 4rem;
    &:focus {
      outline: none;
    }
  }
  span {
    display: flex;
    justify-content: center;
    a {
      text-decoration: none;
      color: var(--app-main-color);
      margin-left: 1rem;
    }
  }
`

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  button {
    color: white;
    border: none;
    cursor: pointer;
    height: 4rem;
    a {
      text-decoration: none;
      color: black;
    }
    &:nth-child(1) {
      background-color: var(--app-main-color);
      margin-bottom: 0.5rem;
    }
    &:nth-child(2) {
      background-color: black;
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
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => {
            setId(e.target.value)
          }}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <BtnContainer>
          <button type="submit">Login</button>
          <button type="button" onClick={handleGithubLogin}>
            Continue with github
          </button>
        </BtnContainer>
        <span>
          Not registered? <Link to="/join">Create an account</Link>
        </span>
      </StyledForm>
    </Container>
  )
}

export default Login
