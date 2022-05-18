import React, { useState } from 'react';
import styled from 'styled-components';
import { loginUser } from '../axios/axios';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 30%;
`;

function Login() {
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');

  let userData = {
    id,
    pwd,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(JSON.stringify(userData));
    console.log(response);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="id">아이디</label>
      <input
        id="id"
        type="text"
        onChange={(e) => {
          setId(e.target.value);
        }}
      />
      <label htmlFor="pwd">비밀번호</label>
      <input
        id="pwd"
        type="text"
        onChange={(e) => {
          setPwd(e.target.value);
        }}
      />
      <button type="submit">로그인</button>
    </StyledForm>
  );
}

export default Login;
