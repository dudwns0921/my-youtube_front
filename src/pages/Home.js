import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getVideos } from '../axios/axios';

function Home() {
  useEffect(() => {
    getAllVideos();
  }, []);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  async function getAllVideos() {
    const { data } = await getVideos();
    setVideos(data);
    setLoading(false);
  }

  return (
    <div>
      {loading
        ? 'Loading...'
        : videos.map((video) => {
            return (
              <div key={video.createdAt}>
                <h1>{video.title}</h1>
                <h2>{video.hashtags}</h2>
                <h2>{video.createdAt}</h2>
                <h2>{video.meta.views}</h2>
                <p>{video.description}</p>
              </div>
            );
          })}
    </div>
  );
}

export default Home;
