import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import NavBar from './components/NavBar'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`

function App() {
  const location = useLocation()
  return (
    <div>
      <NavBar />
      <Content>
        <Outlet key={location.key} />
      </Content>
    </div>
  )
}

export default App
