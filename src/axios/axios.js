import axios from 'axios';

const API_HOST = 'http://localhost:4000';

const instance = axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

function getVideos() {
  return instance.get('/getVideos');
}
function getVideoWithId(id) {
  return instance.post('/getVideo', { id });
}
function loginUser(userData) {
  return instance.post('/login', userData);
}
function uploadVideo(videoObj) {
  return instance.post('/upload', videoObj);
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

export {
  getVideos,
  getVideoWithId,
  loginUser,
  uploadVideo,
  editVideo,
  deleteVideo,
  searchVideo,
};
