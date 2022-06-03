import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { editUserPwd } from '../axios/axios'
import styled from 'styled-components'
import { deleteCookie } from '../utils/cookie'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/slicer/isLoginSlice'
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
function UserPwdEdit() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.userData.value)
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false)

  let payload = {
    newPassword,
    userEmail: userData.email,
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
    const { data } = await editUserPwd(payload)
    if (data.result === 'success') {
      alert('변경된 비밀번호로 다시 로그인해주세요.')
      deleteCookie('token')
      dispatch(logout())
      navigate('/login')
    }
  }
  return (
    <div>
      <StyledForm onSubmit={handleEditUserPwd}>
        <label htmlFor="newPassword">New Password</label>
        <input
          id="newPassword"
          type="password"
          placeholder="New Password"
          required
          onChange={(e) => {
            setNewPassword(e.target.value)
          }}
        />
        <label htmlFor="confirmPassword">Confirm New Password</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm New Password"
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
          Save
        </button>
      </StyledForm>
    </div>
  )
}

export default UserPwdEdit
