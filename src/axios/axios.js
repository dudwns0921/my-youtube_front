import axios from 'axios';

const API_HOST = 'http://localhost:4000';

const instance = axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

function getVideos() {
  return instance.get('/videoFindAll');
}
function getVideoWithId(id) {
  return instance.post('/videoFind', { id });
}
function uploadVideo(videoObj) {
  return instance.post('/videoUpload', videoObj);
}
const editVideo = (payload) => {
  return instance.post('/videoEdit', payload);
};
const deleteVideo = (id) => {
  return instance.post('/videoDelete', { id });
};
const searchVideo = (keyword) => {
  return instance.post('/videosearch', { keyword });
};

function loginUser(userData) {
  return instance.post('/login', userData);
}
function joinUser(userData) {
  return instance.post('/join', userData);
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
};
