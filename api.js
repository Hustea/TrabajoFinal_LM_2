const axios = require('axios');

// Cambia tu API key aquí (de OMDb o IMDb API)
const API_KEY = '8ae031cc';
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

async function searchMovies(query) {
  const response = await axios.get(`${BASE_URL}&s=${encodeURIComponent(query)}`);
  return response.data.Search || [];
}

async function getMovieDetails(imdbID) {
  const response = await axios.get(`${BASE_URL}&i=${imdbID}&plot=full`);
  return response.data;
}

module.exports = { searchMovies, getMovieDetails };
