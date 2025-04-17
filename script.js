const API_KEY = "발급한 API KEY를 입력하세요.";
const BASE_URL = "https://api.themoviedb.org/3";

function showMovieDetails(movieId) {
  fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((res) => {
      const modal = document.createElement("div");
      modal.classList.add("modal");
      modal.innerHTML = `
        <h2>${res.title}</h2>
        <p>${res.overview}</p>
        <button id="close-btn">닫기</button>
      `;
      document.body.appendChild(modal);
      document.getElementById("close-btn").addEventListener("click", () => {
        modal.remove();
      });
    })
    .catch((err) => console.error(err));
}

function displayMovies(movies) {
  const movieListRef = document.getElementById("movie-list");
  movieListRef.innerHTML = "";
  movies.forEach((element) => {
    const { title, poster_path, vote_average, id } = element;
    const movieCard = document.createElement("div");

    movieCard.addEventListener("click", function () {
      showMovieDetails(id);
    });

    movieCard.className = "movie-card";
    movieCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="영화 타이틀" />
      <h3>${title}</h3>
      <p>${vote_average}</p>
    `;
    movieListRef.appendChild(movieCard);
  });
}

function fetchPopularMovies() {
  fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((res) => {
      displayMovies(res.results);
    })
    .catch((err) => console.error(err));
}

function searchMovies(keyword) {
  fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${keyword}`)
    .then((res) => res.json())
    .then((res) => {
      displayMovies(res.results);
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
