import axios from 'axios';

const API_HOST = 'http://localhost:4000';

const instance = axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

function getVideos() {
  return instance.get('/');
}

function loginUser(userData) {
  return instance.post('/login', userData);
}

export { getVideos, loginUser };
