import React from 'react';
import { Link } from 'react-router-dom';
import videos from '../dummy/DummyVideos';

function Home() {
  return (
    <div>
      {videos.map((item) => {
        return (
          <div key={item.id}>
            <h1>{item.title}</h1>
            <Link to={`video/${item.id}`}>Watch Video→</Link>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
