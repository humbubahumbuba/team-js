// // leaving it here in case we'll do a fallback  function
import { getTrendMovies, getGenresMovies } from './api-fetch';

// import keys 
import { lskeys } from "./ls-data";
const { GENRES, HOME_CONTENT, CRT_CONTENT } = lskeys;
// import async receive from localStorage
import { getPromisedData } from './page-content-loader';


let genreList = {};

const mainGallery = document.querySelector('.mainGallery');
const galleryList = document.querySelector('.movieList');
export const textError = document.querySelector('.input__error');

(function () {
  // receiving trends from localstorage here
  getPromisedData(HOME_CONTENT)
    .then(data => createMarkupOfTrendingMovies(data))
    .catch(err => console.log(err));
})();

function getGenresNames() {
  getPromisedData(GENRES)
    .then(genres =>
      genres.forEach(genre => (genreList[genre['id']] = genre['name']))
    )
    .catch(err => console.log(err));
}


export function createMarkupOfTrendingMovies(obj) {
  if (obj.results.length) {
    textError.classList.remove('is-active');
    const markup = obj.results
      .map(
        ({
          id,
          title,
          name,
          poster_path,
          genre_ids,
          release_date,
          first_air_date,
          vote_average,
        }) => `<li class="movieCard" data="${id}">
      <div class="movieCard__img-wrapper">
      <img src="https://image.tmdb.org/t/p/w500/${poster_path}"
        alt="${title || name} movie poster"
        loading="lazy"
        class="movieCard__img"
      />
      </div>
      <div class="movieCard__text">
        <h2 class="movieCard__title">${(title || name).toUpperCase()}</h2>
        <p class="movieCard__info"> ${getGenresNames(genre_ids)}| ${new Date(
          release_date || first_air_date
        ).getFullYear()}
          <span class="movieCard__rate">${vote_average.toFixed(1)}</span></p>
      </div>
      </li>
`
      )
      .join('');
    galleryList.insertAdjacentHTML('afterBegin', markup);
  } else {
    textError.classList.add('is-active')
  }
}
