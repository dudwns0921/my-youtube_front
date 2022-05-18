import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getVideoWithId } from '../axios/axios';

function Video() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState({});
  const [loading, setLoading] = useState(true);
  const getVideo = async (id) => {
    const { data } = await getVideoWithId(id);
    if (data.title) {
      setVideo(data);
    } else {
      navigate('/404');
    }
  };
  useEffect(() => {
    getVideo(id);
  }, []);
  return (
    <div>
      <h1>{video.title}</h1>
      <Link to={`/videoEdit/${id}`}>Edit Video→</Link>
    </div>
  );
}

export default Video;
