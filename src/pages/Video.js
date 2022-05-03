import React from 'react';
import { useParams, Link } from 'react-router-dom';
import videos from '../dummy/DummyVideos';

function Video() {
  let { id } = useParams();
  const videoObj = videos[id - 1];
  return (
    <div>
      <h1>{videoObj.title}</h1>
      <Link to={`/videoEdit/${id}`}>Edit Video→</Link>
    </div>
  );
}

export default Video;
