import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { editUser } from '../axios/axios'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { insert } from '../redux/slicer/userDataSlice'

const StyledForm = styled.form`
  img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
  }
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

function UserInfoEdit() {
  const oldUserData = useSelector((state) => state.userData.value)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [newEmail, setNewEmail] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [avatarFile, setAvatarFile] = useState('')
  const [loading, setLoading] = useState(true)

  const setData = () => {
    setNewEmail(oldUserData.email)
    setNewUsername(oldUserData.username)
    setLoading(false)
  }
  const handleEditUser = async (e) => {
    e.preventDefault()
    let payload = new FormData()
    payload.append('oldEmail', oldUserData.email)
    payload.append('oldUsername', oldUserData.username)
    payload.append('oldAvatarURL', oldUserData.avatarURL)
    payload.append('newEmail', newEmail)
    payload.append('newUsername', newUsername)
    payload.append('avatar', avatarFile)

    const { data } = await editUser(payload)

    if (data) {
      dispatch(insert(data))
      alert('정보가 수정되었습니다.')
      navigate('/mypage')
    }
  }

  useEffect(() => {
    setData()
  }, [])
  return (
    <div>
      {loading ? (
        'Loading...'
      ) : (
        <StyledForm onSubmit={handleEditUser}>
          <img
            src={`${process.env.REACT_APP_SERVER_BASE_URL}${oldUserData.avatarURL}`}
          />
          <label htmlFor="avatar">Avatar</label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setAvatarFile(e.target.files[0])
            }}
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={newEmail}
            onChange={(e) => {
              setNewEmail(e.target.value)
            }}
          />
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={newUsername}
            onChange={(e) => {
              setNewUsername(e.target.value)
            }}
          />
          <button type="submit">Save</button>
        </StyledForm>
      )}
    </div>
  )
}

export default UserInfoEdit
