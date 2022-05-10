import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getVideos } from '../axios/axios';

function Home() {
  async function fetchData() {
    const response = await getVideos();
    console.log(response);
  }

  useEffect(() => {
    fetchData();
  });

  return <div></div>;
}

export default Home;
