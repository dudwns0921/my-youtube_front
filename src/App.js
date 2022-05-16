import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  height: 10vh;
`;

const StyledLink = styled(Link)`
  margin-right: 1rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  height: 90vh;
`;

function App() {
  return (
    <div>
      <Nav>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/login">Login</StyledLink>
        <StyledLink to="/join">Join</StyledLink>
        <StyledLink to="/upload">Upload</StyledLink>
      </Nav>
      <Content>
        <Outlet />
      </Content>
    </div>
  );
}

export default App;
