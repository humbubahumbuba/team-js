import { getTrendMovies, getGenresMovies } from './api-fetch';
import { lskeys } from "./ls-data";
import { getPromisedData } from './page-content-loader';
import { genres } from '../data/genres.json';
import { onSpinnerDisabled, onSpinnerEnabled } from './loader-spinner';
import { container } from './search-movies';

export const galleryList = document.querySelector('.movieList');
export const textError = document.querySelector('.input__error');
export const footer = document.querySelector('.footer');

export function getDataMoviesTrend() {
  footer.classList.add('footer-active');
  container.classList.add('visually-hidden');
  onSpinnerEnabled();
  getPromisedData(lskeys.HOME_CONTENT)
    .then(data => {
      createMarkupOfTrendingMovies(data);
      container.classList.remove('visually-hidden');
      onSpinnerDisabled();
    })
    .catch(err => console.log(err));
};
getDataMoviesTrend();

export function createMarkupOfTrendingMovies(obj) {
  if (obj.results.length) {
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
        <p class="movieCard__info"> ${genereteGenresList(genre_ids)} | ${new Date(
          release_date || first_air_date
        ).getFullYear()}
          <span class="movieCard__rate">${vote_average.toFixed(1)}</span></p>
      </div>
      </li>
`
      )
      .join('');
    galleryList.insertAdjacentHTML('afterBegin', markup);
    footer.classList.remove('footer-active');
  } else {
    textError.classList.add('is-active');
    setTimeout(() => {
      textError.classList.remove('is-active');
    }, 2000);
  }
}

function genereteGenresList(ids) {
  const movieGenres = [];
  genres.forEach(genre => {
    if (ids.includes(genre.id)) {
      movieGenres.push(genre.name);
    }
  })
  if (movieGenres.length > 2) {
    return `${movieGenres[0]}, ${movieGenres[1]}, Other`;
  }
  return movieGenres.join(', ')
}

export function onFooterFixed() {
  footer.classList.add('footer-active');
  container.classList.add('visually-hidden');
}
export function onFooterNoFixed() {
  footer.classList.remove('footer-active');
  container.classList.remove('visually-hidden');
}