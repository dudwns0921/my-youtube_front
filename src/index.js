import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import reset from 'styled-reset'
import { createGlobalStyle } from 'styled-components'

import App from './App'
import Home from './pages/Home'
import Join from './pages/Join'
import Login from './pages/Login'
import Upload from './pages/Upload'
import Video from './pages/Video'
import VideoEdit from './pages/VideoEdit'
import NotFound from './pages/NotFound'
import Search from './pages/Search'
import GIthubLoginProcess from './pages/GIthubLoginProcess'
import MyPage from './pages/MyPage'

const GlobalStyles = createGlobalStyle`
  box-sizing: border-box;
  ${reset}
`

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="join" element={<Join />} />
          <Route path="login" element={<Login />} />
          <Route path="upload" element={<Upload />} />
          <Route path="video/:id" element={<Video />} />
          <Route path="videoEdit/:id" element={<VideoEdit />} />
          <Route path="search/:keyword" element={<Search />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="githubLoginProcess" element={<GIthubLoginProcess />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
