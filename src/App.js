import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import NavBar from './components/NavBar'

const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 1fr 9fr;
`

const Content = styled.div`
  padding: 5.5rem 0.5rem 0 0.5rem;
  // for navBar fixed
  display: flex;
  background-color: #011627;
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
