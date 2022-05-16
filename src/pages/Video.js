import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVideoWithId } from '../axios/axios';

function Video() {
  let { id } = useParams();
  const [video, setVideo] = useState({});
  const [loading, setLoading] = useState(true);
  async function getVideo(id) {
    const { data } = await getVideoWithId(id);
    setVideo(data);
  }
  useEffect(() => {
    getVideo(id);
  }, []);
  return (
    <div>
      <Link to={`/videoEdit/${id}`}>Edit Video→</Link>
    </div>
  );
}

export default Video;
