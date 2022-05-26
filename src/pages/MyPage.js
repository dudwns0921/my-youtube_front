import React, { useState, useEffect } from 'react'
import { getUserFromCookie } from '../utils/cookie'
import { checkPassword, getVideosWithUserId } from '../axios/axios'
import { useNavigate, useOutletContext } from 'react-router-dom'
import styled from 'styled-components'
import Thumbnail from '../components/Thumbnail'

const StyledImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`

const UserInfo = styled.div`
  display: flex;
`

const Container = styled.div`
  display: flex;
`

function MyPage() {
  const outletContext = useOutletContext()
  const navigate = useNavigate()
  const userData = outletContext[1]
  const [myVideos, setMyVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSocial, setIsSocial] = useState(false)

  const setData = async () => {
    const { data } = await getVideosWithUserId({ userId: userData.id })
    setMyVideos(data)
    setIsSocial(JSON.parse(getUserFromCookie()).isSocial)
  }
  const handleNavigateEdit = async () => {
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

  useEffect(() => {
    if (userData) {
      console.log(userData)
      setData()
    }
    setLoading(false)
  }, [])
  return (
    <div>
      {loading ? (
        'Loading...'
      ) : (
        <UserInfo>
          <StyledImg
            src={
              isSocial
                ? userData.avatarURL
                : `${process.env.REACT_APP_SERVER_BASE_URL}${userData.avatarURL}`
            }
          />
          <div>
            <h1>이메일 : {userData.email}</h1>
            <h1>닉네임 : {userData.username}</h1>
            {isSocial === true ? (
              '소셜 로그인 계정은 정보를 수정할 수 없습니다.'
            ) : (
              <button onClick={handleNavigateEdit}>정보 수정하기</button>
            )}
          </div>
        </UserInfo>
      )}
      <hr />
      <h1>내 비디오들</h1>
      <Container>
        {myVideos.length > 0
          ? myVideos.map((video) => {
              return <Thumbnail key={video.createdAt} videoObj={video} />
            })
          : 'No videos'}
      </Container>
    </div>
  )
}

export default MyPage
