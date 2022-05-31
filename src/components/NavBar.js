import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { deleteCookie } from '../utils/cookie'
import SearchBar from './SearchBar'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/slicer/isLoginSlice'
import { remove } from '../redux/slicer/userDataSlice'

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

function NavBar() {
  const isLogin = useSelector((state) => state.isLogin.value)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    deleteCookie('user')
    deleteCookie('token')
    dispatch(logout())
    dispatch(remove())
    navigate('/')
  }
  return (
    <Nav>
      <StyledLink to="/">Home</StyledLink>
      {isLogin ? (
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
