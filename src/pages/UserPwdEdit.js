import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { editUserPwd } from '../axios/axios'
import styled from 'styled-components'
import { getUserFromCookie, deleteCookie } from '../utils/cookie'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 30%;
`

function UserPwdEdit() {
  const [setIsLogin] = useOutletContext()
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false)

  let newUserPwdData = {
    newPassword,
    userEmail: JSON.parse(getUserFromCookie()).email,
  }

  useEffect(() => {
    if (newPassword === confirmNewPassword) {
      setIsPasswordConfirmed(true)
    } else {
      setIsPasswordConfirmed(false)
    }
  }, [newPassword, confirmNewPassword])

  const handleEditUserPwd = async (e) => {
    e.preventDefault()
    const { data } = await editUserPwd(newUserPwdData)
    if (data.result === 'success') {
      alert('변경된 비밀번호로 다시 로그인해주세요.')
      deleteCookie('user')
      deleteCookie('token')
      setIsLogin(false)
      navigate('/login')
    }
  }
  return (
    <div>
      <StyledForm onSubmit={handleEditUserPwd}>
        <label htmlFor="newPassword">새 비밀번호</label>
        <input
          id="newPassword"
          type="password"
          required
          onChange={(e) => {
            setNewPassword(e.target.value)
          }}
        />
        <label htmlFor="confirmPassword">새 비밀번호 획인</label>
        <input
          id="confirmPassword"
          type="password"
          required
          onChange={(e) => {
            setConfirmNewPassword(e.target.value)
          }}
        />
        {isPasswordConfirmed ? (
          ''
        ) : (
          <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>
        )}
        <button disabled={isPasswordConfirmed ? false : true} type="submit">
          비밀번호 수정
        </button>
      </StyledForm>
    </div>
  )
}

export default UserPwdEdit