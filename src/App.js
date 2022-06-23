import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import NavBar from './components/NavBar'

const Container = styled.div`
  display: grid;
  min-height: 100vh;
  background-color: #011627;
`

const Content = styled.div`
  padding: 5rem 0.5rem 0 0.5rem;
  // for navBar fixed
  display: flex;
  grid-template-rows: 1fr 9fr;
`

function App() {
  const location = useLocation()
  return (
    <Container>
      <NavBar />
      <Content>
        <Outlet key={location.key} />
      </Content>
    </Container>
  )
}

export default App
