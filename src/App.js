import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import NavBar from './components/NavBar'

const Content = styled.div`
  border: 1px solid black;
  padding: 0.5rem;
  display: flex;
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
