import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import NavBar from './components/NavBar'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`

function App() {
  const [isLogin, setIsLogin] = useState(false)
  return (
    <div>
      <NavBar isLogin={isLogin} setIsLogin={setIsLogin} />
      <Content>
        <Outlet context={[setIsLogin]} />
      </Content>
    </div>
  )
}

export default App
