import React, { useState, useEffect } from 'react'
import { getUserFromCookie } from '../utils/cookie'
import { checkPassword, checkUserData } from '../axios/axios'
import { useNavigate } from 'react-router-dom'

function MyPage() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({})
  const [loading, setLoading] = useState(true)
  const [isSocial, setIsSocial] = useState(false)
  useEffect(() => {
    setUserData(JSON.parse(getUserFromCookie()))
    checkSocialLogin(JSON.parse(getUserFromCookie()))
    setLoading(false)
  }, [])
  const checkSocialLogin = async (userData) => {
    const { data } = await checkUserData(userData)
    if (data.exist === true) {
      setIsSocial(false)
    } else {
      setIsSocial(true)
    }
  }
  const handleNavigteEdit = async () => {
    let password = window.prompt(
      '본인 확인을 위해 비밀번호를 다시 입력해주세요.'
    )
    const { data } = await checkPassword({ email: userData.email, password })
    if (data.isPasswordCorrect) {
      navigate('/userEdit')
    } else {
      alert('비밀번호가 맞지 않습니다!')
    }
  }
  return (
    <div>
      {loading ? (
        'Loading...'
      ) : (
        <>
          <h1>이메일 : {userData.email}</h1>
          <h1>닉네임 : {userData.username}</h1>
          {isSocial === true ? (
            '소셜 로그인 계정은 정보를 수정할 수 없습니다.'
          ) : (
            <button onClick={handleNavigteEdit}>정보 수정하기</button>
          )}
        </>
      )}
    </div>
  )
}

export default MyPage
