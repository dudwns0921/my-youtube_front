import React, { useState, useEffect } from 'react'
import { checkPassword, getVideosWithUserId } from '../axios/axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Thumbnail from '../components/Thumbnail'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-gap: 0.5rem;

  section {
    &:nth-child(1) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 0.5rem;
    }
    &:nth-child(2) {
      display: flex;
      justify-content: space-evenly;
    }
  }
`

const UserInfo = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-gap: 0.5rem;
  main {
    background-color: white;
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      display: flex;
      align-items: center;
      img {
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        margin-right: 2rem;
      }
      h1 {
        font-size: 2rem;
      }
    }
    button {
      width: 20%;
      border-radius: 2rem;
      min-width: var(--element-button-min-width);
      border: none;
      background-color: var(--app-main-color);
      cursor: pointer;
      color: white;
      padding: 1rem;
    }
  }
  div {
    background-color: white;
  }
`

const UserEtc = styled.div`
  background-color: white;
`

function MyPage() {
  const userData = useSelector((state) => state.userData.value)
  const navigate = useNavigate()
  const [myVideos, setMyVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSocial, setIsSocial] = useState(false)

  const setData = async () => {
    const { data } = await getVideosWithUserId({ username: userData.username })
    setMyVideos(data)
    setIsSocial(userData.isSocial)
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
      setData()
    }
    setLoading(false)
  }, [])
  return (
    <>
      {loading ? (
        'Loading...'
      ) : (
        <Container>
          <section>
            <UserInfo>
              <main>
                <div>
                  <img
                    src={
                      isSocial
                        ? userData.avatarURL
                        : `${process.env.REACT_APP_SERVER_BASE_URL}${userData.avatarURL}`
                    }
                  />
                  <h1>{userData.username}</h1>
                </div>
                {isSocial === true ? (
                  '소셜 로그인 계정은 정보를 수정할 수 없습니다.'
                ) : (
                  <button onClick={handleNavigateEdit}>EDIT</button>
                )}
              </main>
              <div>
                {/* 여기에는 얼마나 많은 동영상 올렸는지, 댓글은 몇 개 달았는지 등등의 정보 입력할 예정 */}
              </div>
            </UserInfo>
            <UserEtc></UserEtc>
          </section>
          <section>
            {/* {myVideos.length > 0
              ? myVideos.map((video) => {
                  return <Thumbnail key={video.createdAt} videoObj={video} />
                })
              : 'No videos'} */}
          </section>
        </Container>
      )}
    </>
  )
}

export default MyPage
