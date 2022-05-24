import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import NavBar from './components/NavBar'
import { getUserFromCookie } from './utils/cookie'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`

function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (getUserFromCookie()) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
    setLoading(false)
  }, [])
  return (
    <div>
      {loading ? (
        'Loading...'
      ) : (
        <div>
          {' '}
          <NavBar isLogin={isLogin} setIsLogin={setIsLogin} />
          <Content>
            <Outlet context={[setIsLogin]} />
          </Content>{' '}
        </div>
      )}
    </div>
  )
}

export default App
