import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Join from './pages/Join';
import Login from './pages/Login';
import Video from './pages/Video';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="video" element={<Video />} />
        <Route path="login" element={<Login />} />
        <Route path="join" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
