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
import UserEdit from './pages/UserEdit'
import UserInfoEdit from './pages/UserInfoEdit'
import UserPwdEdit from './pages/UserPwdEdit'
import { Provider } from 'react-redux'
import store from './redux/store'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  :root {
    --component-thumbnail-min-width: 20rem;
    --component-thumbnail-min-height: 25rem;
    --app-main-color: #F53083;
    --element-button-min-width: 6rem;
  }
  ${reset}
`

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
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
          <Route path="userEdit" element={<UserEdit />}>
            <Route index element={<UserInfoEdit />} />
            <Route path="pwd" element={<UserPwdEdit />} />
          </Route>
          <Route path="githubLoginProcess" element={<GIthubLoginProcess />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)
