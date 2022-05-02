import React from 'react';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
`;

const StyledLink = styled(Link)`
  margin-right: 1rem;
`;

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Nav>
        <StyledLink to="/video">비디오</StyledLink>
        <StyledLink to="/login">로그인</StyledLink>
        <StyledLink to="/join">회원가입</StyledLink>
      </Nav>
    </div>
  );
}

export default Home;
