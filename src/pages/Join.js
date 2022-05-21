import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { joinUser } from '../axios/axios'
import { useNavigate } from 'react-router-dom'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 30%;
`

function Join() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false)

  let userData = {
    email,
    username,
    password,
  }

  useEffect(() => {
    if (password === confirmPassword) {
      setIsPasswordConfirmed(true)
    } else {
      setIsPasswordConfirmed(false)
    }
  }, [password, confirmPassword])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data } = await joinUser(JSON.stringify(userData))
    if (data.result === 'success') {
      alert('회원가입에 성공했습니다.')
      navigate('/login')
    } else {
      alert(data.message)
    }
  }
  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="id">이메일</label>
      <input
        id="id"
        type="text"
        required
        onChange={(e) => {
          setEmail(e.target.value)
        }}
      />
      <label htmlFor="username">닉네임</label>
      <input
        id="username"
        type="text"
        required
        onChange={(e) => {
          setUsername(e.target.value)
        }}
      />
      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        type="password"
        required
        onChange={(e) => {
          setPassword(e.target.value)
        }}
      />
      <label htmlFor="confirmPassword">비밀번호 획인</label>
      <input
        id="confirmPassword"
        type="password"
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
        회원가입
      </button>
    </StyledForm>
  )
}

export default Join
