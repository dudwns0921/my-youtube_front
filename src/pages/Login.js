import React, { useState } from 'react'
import styled from 'styled-components'
import { loginUser } from '../axios/axios'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 30%;
`

function Login() {
  const [email, setId] = useState('')
  const [password, setPassword] = useState('')

  let userData = {
    email,
    password,
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await loginUser(JSON.stringify(userData))
    console.log(response)
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
    </StyledForm>
  )
}

export default Login
