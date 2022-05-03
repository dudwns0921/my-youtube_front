import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import videos from '../dummy/DummyVideos';

function VideoEdit() {
  let { id } = useParams();
  let navigate = useNavigate();
  const videoObj = videos[id - 1];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('post new title!');
    navigate('/');
  };
  return (
    <div>
      <h1>Editing : {videoObj.title}</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Video Title" type="text" />
        <input type="submit" value="save" />
      </form>
    </div>
  );
}

export default VideoEdit;
