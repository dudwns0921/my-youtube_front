import axios from 'axios'
import { setInterceptor } from './interceptor'

export const API_HOST = 'http://localhost:4000'

// 토큰 헤더 없는 axios 객체

const instance = axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
})

// 토큰 헤더 axios 객체

const createInstanceWithAuth = () => {
  const instance = axios.create({
    baseURL: API_HOST,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })
  return setInterceptor(instance)
}

// 토큰, 폼데이터 헤더 axios 객체

const createInstanceWithFormData = () => {
  const instance = axios.create({
    baseURL: API_HOST,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return setInterceptor(instance)
}

const instanceWithAuth = createInstanceWithAuth()
const instanceWithFormData = createInstanceWithFormData()

// 토큰 인증 필요없는 api

function getVideos() {
  return instance.get('/videoFindAll')
}
function getVideoWithId(id) {
  return instance.post('/videoFind', id)
}
const searchVideo = (keyword) => {
  return instance.post('/videosearch', keyword)
}
function loginUser(userData) {
  return instance.post('/login', userData)
}
function joinUser(userData) {
  return instance.post('/join', userData)
}
const githubLogin = (githubCode) => {
  return instance.post('/githubLogin', githubCode)
}

// 토큰 인증 필요한 api

function uploadVideo(videoObj) {
  return instanceWithFormData.post('/videoUpload', videoObj)
}
const editVideo = (payload) => {
  return instanceWithAuth.post('/videoEdit', payload)
}
const deleteVideo = (id) => {
  return instanceWithAuth.post('/videoDelete', id)
}
const checkPassword = (password) => {
  return instanceWithAuth.post('/checkPassword', password)
}
const checkUserData = (userData) => {
  return instanceWithAuth.post('/checkUserData', userData)
}
const editUser = (newUserData) => {
  return instanceWithFormData.post('/editUser', newUserData)
}
const editUserPwd = (newPasswordData) => {
  return instanceWithAuth.post('/editUserPwd', newPasswordData)
}

const getVideosWithUserId = (userId) => {
  return instanceWithAuth.post('/myVideos', userId)
}

export {
  getVideos,
  getVideoWithId,
  uploadVideo,
  editVideo,
  deleteVideo,
  searchVideo,
  loginUser,
  joinUser,
  githubLogin,
  checkPassword,
  checkUserData,
  editUser,
  editUserPwd,
  getVideosWithUserId,
}
