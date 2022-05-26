import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import NavBar from './components/NavBar'
import { getUserFromCookie } from './utils/cookie'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`

function App() {
  const location = useLocation()
  const [isLogin, setIsLogin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState({})
  useEffect(() => {
    if (getUserFromCookie()) {
      init()
    } else {
      setIsLogin(false)
    }
    setLoading(false)
  }, [])
  const init = () => {
    setUserData(JSON.parse(getUserFromCookie()))
    setIsLogin(true)
  }
  return (
    <div>
      {loading ? (
        'Loading...'
      ) : (
        <div>
          <NavBar isLogin={isLogin} setIsLogin={setIsLogin} />
          <Content>
            <Outlet
              key={location.key}
              context={[setIsLogin, userData, setUserData]}
            />
          </Content>
        </div>
      )}
    </div>
  )
}

export default App
