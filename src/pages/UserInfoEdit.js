import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { editUser } from '../axios/axios'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { insert } from '../redux/slicer/userDataSlice'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 30%;
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
          <label htmlFor="avatar">Avatar</label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setAvatarFile(e.target.files[0])
            }}
          />
          <label htmlFor="newEmail">이메일</label>
          <input
            id="newEmail"
            type="text"
            value={newEmail}
            onChange={(e) => {
              setNewEmail(e.target.value)
            }}
          />
          <label htmlFor="newUsername">닉네임</label>
          <input
            id="newUsername"
            type="text"
            value={newUsername}
            onChange={(e) => {
              setNewUsername(e.target.value)
            }}
          />
          <button type="submit">수정</button>
        </StyledForm>
      )}
    </div>
  )
}

export default UserInfoEdit
