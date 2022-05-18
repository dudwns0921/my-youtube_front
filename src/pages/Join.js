import React, { useState } from 'react';
import styled from 'styled-components';
import { joinUser } from '../axios/axios';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 30%;
`;

function Join() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let userData = {
    email,
    username,
    password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await joinUser(JSON.stringify(userData));
    console.log(response);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="id">이메일</label>
      <input
        id="id"
        type="text"
        required
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <label htmlFor="username">닉네임</label>
      <input
        id="username"
        type="text"
        required
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <label htmlFor="password">비밀번호</label>
      <input
        id="pwd"
        type="password"
        required
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button type="submit">회원가입</button>
    </StyledForm>
  );
}

export default Join;
