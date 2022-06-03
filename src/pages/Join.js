import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { joinUser } from '../axios/axios'
import { useNavigate } from 'react-router-dom'

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
  width: 30%;
  min-width: 35rem;
  min-height: 30rem;
  background-color: white;
  padding: 3rem;
  input {
    padding: 1rem;
    border: none;
    background-color: #f2f2f2;
    height: 4rem;
    margin-bottom: 1rem;
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
  p {
    margin-bottom: 1rem;
  }
`
function Join() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false)

  let payload = {
    email,
    username,
    password,
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data } = await joinUser(payload)
    if (data.result === 'success') {
      alert('회원가입에 성공했습니다.')
      navigate('/login')
    }
  }

  useEffect(() => {
    if (password === confirmPassword) {
      setIsPasswordConfirmed(true)
    } else {
      setIsPasswordConfirmed(false)
    }
  }, [password, confirmPassword])
  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          required
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <input
          type="text"
          placeholder="username"
          required
          onChange={(e) => {
            setUsername(e.target.value)
          }}
        />
        <input
          type="password"
          placeholder="password"
          required
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <input
          type="password"
          placeholder="password confirm"
          required
          onChange={(e) => {
            setConfirmPassword(e.target.value)
          }}
        />
        {isPasswordConfirmed ? (
          ''
        ) : (
          <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>
        )}
        <button disabled={isPasswordConfirmed ? false : true} type="submit">
          Join
        </button>
      </StyledForm>
    </Container>
  )
}

export default Join
