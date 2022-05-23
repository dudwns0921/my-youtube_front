import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { editUser } from '../axios/axios'
import styled from 'styled-components'
import { getUserFromCookie, saveUserToCookie } from '../utils/cookie'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 30%;
`

function UserInfoEdit() {
  const navigate = useNavigate()
  const [oldUserData, setOldUserData] = useState({})
  const [newEmail, setNewEmail] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [loading, setLoading] = useState(true)

  let newUserData = {
    oldEmail: oldUserData.email,
    oldUsername: oldUserData.username,
    newEmail,
    newUsername,
  }

  useEffect(() => {
    setData()
  }, [])
  const setData = async () => {
    setOldUserData(JSON.parse(getUserFromCookie()))
    setNewEmail(JSON.parse(getUserFromCookie()).email)
    setNewUsername(JSON.parse(getUserFromCookie()).username)
    setLoading(false)
  }
  const handleEditUser = async (e) => {
    e.preventDefault()
    const { data } = await editUser(newUserData)
    if (data.userData) {
      saveUserToCookie(JSON.stringify(data.userData))
      alert('정보가 수정되었습니다.')
      navigate('/mypage')
    } else {
      alert(data.message)
    }
  }
  return (
    <div>
      {loading ? (
        'Loading...'
      ) : (
        <StyledForm onSubmit={handleEditUser}>
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
