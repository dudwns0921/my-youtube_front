import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function VideoEdit() {
  let { id } = useParams();
  let navigate = useNavigate();

  return (
    <div>
      <h1>Editing</h1>
    </div>
  );
}

export default VideoEdit;
