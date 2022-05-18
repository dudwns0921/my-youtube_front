import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { uploadVideo } from '../axios/axios';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 30%;
`;

function Upload() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [hashtags, setHashtags] = useState('');
  let videoObj = {
    title: title,
    description: desc,
    hashtags: hashtags,
  };
  const handleUploadVideo = async (e) => {
    e.preventDefault();
    const { data } = await uploadVideo(videoObj);
    if (data.result === 'success') {
      alert(data.result);
      navigate('/');
    } else {
      alert(data.message);
    }
  };
  return (
    <div>
      <StyledForm onSubmit={handleUploadVideo}>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          required
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor="desc">내용</label>
        <input
          id="desc"
          type="text"
          required
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        <label htmlFor="hashtags">해시태그</label>
        <input
          id="hashtags"
          type="text"
          required
          placeholder="Hashtags, separated by comma"
          onChange={(e) => {
            setHashtags(e.target.value);
          }}
        />
        <input type="submit" value="전송" />
      </StyledForm>
    </div>
  );
}

export default Upload;
