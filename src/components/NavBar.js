import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { deleteCookie } from '../utils/cookie'
import SearchBar from './SearchBar'

const Nav = styled.nav`
  display: flex;
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
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
          <StyledLink to="/mypage">Mypage</StyledLink>
        </>
      ) : (
        <>
          <StyledLink to="/login">Login</StyledLink>
          <StyledLink to="/join">Join</StyledLink>
        </>
      )}
      <StyledLink to="/upload">Upload</StyledLink>
      <SearchBar />
    </Nav>
  )
}

export default NavBar
