import { onSpinnerDisabled, onSpinnerEnabled } from './loader-spinner';
import { genres } from '../data/genres.json';
// import { onFooterFixed, onFooterNoFixed } from './render-cards';
import { closeModalBtn, backdgop } from './modalMovie';

const emptyLibraryContaineRef = document.querySelector('.library-empty');
const libraryListRef = document.querySelector('.library_list');
const watchedLibraryBtn = document.querySelector('.js-watched');
const queueLibraryBtn = document.querySelector('.js-queue');

export const watchedStorageData = localStorage.getItem('watchedList');
export const queueStorageData = localStorage.getItem('queueList');

onWatchedLibraryBtnClick();

watchedLibraryBtn.addEventListener('click', onWatchedLibraryBtnClick);
queueLibraryBtn.addEventListener('click', onQueueLibraryBtnClick);
closeModalBtn.addEventListener('click', updateLibraryMarkup);
document.addEventListener('keydown', event => closeModalOnEscape(event));
backdgop.addEventListener('click', event => closeModalOnbackDrop(event));

function onWatchedLibraryBtnClick() {
  queueLibraryBtn.classList.remove('active-button');
  watchedLibraryBtn.classList.add('active-button');

  libraryListRef.innerHTML = '';

  const parsedWatchedFilms = JSON.parse(localStorage.getItem('watchedList'));

  if (!parsedWatchedFilms || parsedWatchedFilms.length === 0) {
    emptyLibraryContaineRef.style.display = 'block';
    return;
  } else {
    emptyLibraryContaineRef.style.display = 'none';
    const arrLocalFilms = parsedWatchedFilms.map(id => {
      return fetchLibraryMovieByID(id).then(data => {
        createMovieLibraryMarkup(data);
      });
    });
  }
}

function onQueueLibraryBtnClick() {
  watchedLibraryBtn.classList.remove('active-button');
  queueLibraryBtn.classList.add('active-button');

  libraryListRef.innerHTML = '';

  const parsedQueueFilms = JSON.parse(localStorage.getItem('queueList'));

  if (!parsedQueueFilms || parsedQueueFilms.length === 0) {
    emptyLibraryContaineRef.style.display = 'block';
    return;
  } else {
    emptyLibraryContaineRef.style.display = 'none';
    const arrLocalFilms = parsedQueueFilms.map(id => {
      return fetchLibraryMovieByID(id).then(data => {
        createMovieLibraryMarkup(data);
      });
    });
  }
}

function createMovieLibraryMarkup({
  id,
  title,
  name,
  poster_path,
  genres,
  release_date,
  first_air_date,
  vote_average,
}) {
  const genreIds = [];
  genreIds.push(genres.map(genreId => genreId.id));
  const genresArr = genreIds[0];

  const markup = `<li class="movieCard" data="${id}">
      <div class="movieCard__img-wrapper">
      <img src="https://image.tmdb.org/t/p/w500/${poster_path}"
        alt="${title || name} movie poster"
        loading="lazy"
        class="movieCard__img"
      />
      </div>
      <div class="movieCard__text">
        <h2 class="movieCard__title">${(title || name).toUpperCase()}</h2>
        <p class="movieCard__info"> ${genereteGenresList(
          genresArr
        )} | ${new Date(release_date || first_air_date).getFullYear()}
          <span class="movieCard__rate">${vote_average.toFixed(1)}</span></p>
      </div>
      </li> `;

  libraryListRef.insertAdjacentHTML('beforeend', markup);
}

function genereteGenresList(ids) {
  const movieGenres = [];
  genres.forEach(genre => {
    if (ids.includes(genre.id)) {
      movieGenres.push(genre.name);
    }
  });
  if (movieGenres.length > 2) {
    return `${movieGenres[0]}, ${movieGenres[1]}, Other`;
  }

  return movieGenres.join(', ');
}

async function fetchLibraryMovieByID(id) {
  const BASE_URL = 'https://api.themoviedb.org/3/';
  const API_KEY = 'e8d94f3e976148bda0a5c640d4df112b';

  onSpinnerEnabled();
  const response = await fetch(
    `${BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  onSpinnerDisabled();

  const data = await response.json();

  return data;
}

function updateLibraryMarkup() {
  if (!watchedStorageData || watchedStorageData.length === 0) {
    emptyLibraryContaineRef.style.display = 'block';
  }
  //
  else if (!queueStorageData || queueStorageData.length === 0) {
    emptyLibraryContaineRef.style.display = 'block';
  }
  //
  else if (watchedLibraryBtn.classList.contains('active-button')) {
    emptyLibraryContaineRef.style.display = 'none';
    libraryListRef.innerHTML = '';

    const parsedWatchedFilms = JSON.parse(localStorage.getItem('watchedList'));
    const arrLocalFilms = parsedWatchedFilms.map(id => {
      return fetchLibraryMovieByID(id).then(data => {
        createMovieLibraryMarkup(data);
      });
    });
  }
  //
  else {
    emptyLibraryContaineRef.style.display = 'none';
    libraryListRef.innerHTML = '';

    const parsedQueueFilms = JSON.parse(localStorage.getItem('queueList'));
    const arrLocalFilms = parsedQueueFilms.map(id => {
      return fetchLibraryMovieByID(id).then(data => {
        createMovieLibraryMarkup(data);
      });
    });
  }
}

function closeModalOnEscape(event) {
  if (event.key !== 'Escape') {
    return;
  }

  updateLibraryMarkup();
}

function closeModalOnbackDrop(event) {
  if (event.target === event.currentTarget) {
    updateLibraryMarkup();
  }
}
