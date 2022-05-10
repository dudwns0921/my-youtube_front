import React from 'react';
import { useParams, Link } from 'react-router-dom';

function Video() {
  let { id } = useParams();
  return (
    <div>
      <Link to={`/videoEdit/${id}`}>Edit Video→</Link>
    </div>
  );
}

export default Video;
