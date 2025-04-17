const API_KEY = "발급한 API KEY를 입력하세요.";
const BASE_URL = "https://api.themoviedb.org/3";

function fetchPopularMovies() {
  fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}

document.addEventListener("DOMContentLoaded", function () {
  fetchPopularMovies();
});
