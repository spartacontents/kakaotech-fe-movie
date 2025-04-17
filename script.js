const API_KEY = "발급한 API KEY를 입력하세요.";
const BASE_URL = "https://api.themoviedb.org/3";

function displayMovies(movies) {
  movies.forEach(element => {
    const {title, poster_path, vote_average} = element;
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";
    movieCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="영화 타이틀" />
      <h3>${title}</h3>
      <p>${vote_average}</p>
    `
    document.getElementById("movie-list").appendChild(movieCard)
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

document.addEventListener("DOMContentLoaded", function () {
  fetchPopularMovies();
});
