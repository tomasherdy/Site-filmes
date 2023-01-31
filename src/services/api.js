import axios from 'axios';

// BASE DA URL: https://api.themoviedb.org/3/
// URL DA API: movie/now_playing?api_key=a252df8dc13910bd12fa64ca3e7ff907

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/'
});

export default api;
