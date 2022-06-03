import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

const Container = styled.div`
  background-color: white;
  min-width: 50%;
  height: 100%;
  nav {
    background-color: #011627;
    font-size: 1.5rem;
  }
`
const StyledLink = styled(Link)`
  background-color: ${(props) => (props.currentpage ? 'white' : 'transparent')};
  color: ${(props) => (props.currentpage ? '#011627' : 'white')};
  text-decoration: none;
  border-radius: 2px 2px 0 0;
  padding: 0 0.5rem;
`

function UserEdit() {
  return (
    <Container>
      <nav>
        <StyledLink
          currentpage={location.pathname.substring(1) === 'userEdit'}
          to=""
        >
          정보 수정하기
        </StyledLink>
        <StyledLink
          currentpage={location.pathname.substring(1) === 'userEdit/pwd'}
          to="pwd"
        >
          비밀번호 수정하기
        </StyledLink>
      </nav>
      <Outlet />
    </Container>
  )
}

export default UserEdit
