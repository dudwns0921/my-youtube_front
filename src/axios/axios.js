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
function getVideoWithId(payload) {
  return instance.post('/videoFind', payload)
}
const searchVideo = (payload) => {
  return instance.post('/videosearch', payload)
}
function loginUser(payload) {
  return instance.post('/login', payload)
}
function joinUser(payload) {
  return instance.post('/join', payload)
}
const githubLogin = (payload) => {
  return instance.post('/githubLogin', payload)
}

// 토큰 인증 필요한 api

function uploadVideo(payload) {
  return instanceWithFormData.post('/videoUpload', payload)
}
const editVideo = (payload) => {
  return instanceWithAuth.post('/videoEdit', payload)
}
const deleteVideo = (payload) => {
  return instanceWithAuth.post('/videoDelete', payload)
}
const checkPassword = (payload) => {
  return instanceWithAuth.post('/checkPassword', payload)
}
const checkUserData = (payload) => {
  return instanceWithAuth.post('/checkUserData', payload)
}
const editUser = (payload) => {
  return instanceWithFormData.post('/editUser', payload)
}
const editUserPwd = (payload) => {
  return instanceWithAuth.post('/editUserPwd', payload)
}

const getVideosWithUserId = (payload) => {
  return instanceWithAuth.post('/myVideos', payload)
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
