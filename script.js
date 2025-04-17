const API_KEY = "c16ac3801e10111f7251235a3f0cf44b";
const BASE_URL = "https://api.themoviedb.org/3";

function displayMovies(movies) {
  const movieListRef = document.getElementById("movie-list");
  movieListRef.innerHTML = "";
  movies.forEach(element => {
    const {title, poster_path, vote_average} = element;
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";
    movieCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="영화 타이틀" />
      <h3>${title}</h3>
      <p>${vote_average}</p>
    `
    movieListRef.appendChild(movieCard);
  });
}

function fetchPopularMovies() {
  fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((res) => {
      displayMovies(res.results)
    })
    .catch((err) => console.error(err));
}

function searchMovies(keyword) {
  fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${keyword}`)
    .then((res) => res.json())
    .then((res) => {
      displayMovies(res.results)
    })
    .catch((err) => console.error(err));
}


document.addEventListener("DOMContentLoaded", function () {
  fetchPopularMovies();

  document.getElementById("search-btn").addEventListener("click", () => {
    const keyword = document.getElementById("search-input").value;
    searchMovies(keyword);
  });
});