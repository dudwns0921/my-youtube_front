import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { deleteCookie } from '../utils/cookie'
import SearchBar from './SearchBar'

const Nav = styled.nav`
  display: flex;
  span {
    margin-right: 1rem;
    cursor: pointer;
  }
`

const StyledLink = styled(Link)`
  margin-right: 1rem;
`

function NavBar(props) {
  const navigate = useNavigate()

  const handleLogout = () => {
    deleteCookie('user')
    deleteCookie('token')
    props.setIsLogin(false)
    navigate('/')
  }
  return (
    <Nav>
      <StyledLink to="/">Home</StyledLink>
      {props.isLogin ? (
        <>
          <span onClick={handleLogout}>Logout</span>
          <StyledLink to="/mypage">Mypage</StyledLink>
          <StyledLink to="/upload">Upload</StyledLink>
        </>
      ) : (
        <>
          <StyledLink to="/login">Login</StyledLink>
          <StyledLink to="/join">Join</StyledLink>
        </>
      )}
      <SearchBar />
    </Nav>
  )
}

export default NavBar
