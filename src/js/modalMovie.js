import axios from 'axios';
import { onSpinnerDisabled, onSpinnerEnabled } from './loader-spinner';
import { textModalBtn, addWatchList, addQueueList } from './watchQueueBtn';

export const backdgop = document.querySelector('.js-backdrop');
const modalMovie = document.querySelector('.js-modal-movie');
const movieBox = document.querySelector('.js-movie-box');
const movieImg = document.querySelector('.library-empty');
const moviePoster = document.querySelector('.library-empty__image');
export const closeModalBtn = document.querySelector('.js-close-btn');
const movieList =
  document.querySelector('.js-movieList') ||
  document.querySelector('.js-library_list');

closeModalBtn.addEventListener('click', onCloseModalBtnClick);
movieList.addEventListener('click', onMovieClick);
backdgop.addEventListener('click', onBackdropClick);

export let selectedMovieId;

function onMovieClick(event) {
  const movieCard = event.target;
  const isMovieCard =
    movieCard.classList.contains('movieCard__img') ||
    movieCard.classList.contains('movieCard__info') ||
    movieCard.classList.contains('movieCard__title');
  if (isMovieCard) {
    selectedMovieId =
      movieCard.parentElement.parentElement.getAttribute('data');
    showModal();
    document.addEventListener('keydown', closeModalOnEscapePress);
    renderMovieById(selectedMovieId);
    textModalBtn(selectedMovieId);

    const btnQueue = document.querySelector('.control-btn--to-queue');
    const btnWatch = document.querySelector('.control-btn--to-watched');
    btnQueue.addEventListener('click', addQueueList);
    btnWatch.addEventListener('click', addWatchList);
  }
}

function closeModalOnEscapePress(event) {
  if (event.code === 'Escape') {
    hideModal();
    document.removeEventListener('keydown', closeModalOnEscapePress);
    movieImg.classList.add('visually-hidden');
    moviePoster.classList.add('visually-hidden');

  }
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    hideModal();
    movieImg.classList.add('visually-hidden');
    moviePoster.classList.add('visually-hidden');

  }
}

function showModal() {
  modalMovie.parentElement.classList.remove('is-hidden');
  modalMovie.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');
}

function hideModal() {

  modalMovie.parentElement.classList.add('is-hidden');
  modalMovie.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
  const btnWatch = document.querySelector('.control-btn--to-watched');
  btnWatch.removeEventListener('click', addWatchList);

  const btnQueue = document.querySelector('.control-btn--to-queue');
  btnQueue.removeEventListener('click', addQueueList);
}

function onCloseModalBtnClick() {
  hideModal();
}

function makeMovieMarkup(data) {
  const {
    original_name,
    name,
    genres,
    overview,
    popularity,
    poster_path,
    title,
    vote_average,
    vote_count,
  } = data;
  const movieGenres = [];
  genres.forEach(genre => movieGenres.push(genre.name));
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500/';
  const markup = `
        <img class="modal-movie__poster" src="${imageBaseUrl}/${poster_path}" alt="${title || name || original_name
    }" loading="lazy" >
            <div class="movie-card">
                <h2 class="movie-card__title">${(
      title ||
      name ||
      original_name
    ).toUpperCase()}</h2>
                <table class="info-table">
                    <tbody>
                        <tr>
                            <td class="info-table__classification">Vote / Votes</td>
                            <td class="info-table__classification-data">
                                <span class="rating rating--vote">${vote_average.toFixed(
      1
    )}</span>
                                <span class="rating--slash-color">/</span>
                                <span class="rating rating--votes">${vote_count}</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="info-table__classification">Popularity</td>
                            <td class="info-table__classification-data">${popularity}</td>
                        </tr>
                        <tr>
                            <td class="info-table__classification">Original Title</td>
                            <td class="info-table__classification-data">${title || original_name
    }</td>
                        </tr>
                        <tr>
                            <td class="info-table__classification info-table__classification--not-margin">Genres</td>
                            <td class="info-table__classification-data">${movieGenres.join(', ') || 'No information..'
    }</td>
                        </tr>
                    </tbody>
                </table>
                <h3 class="movie-card__about-title">About</h3>
                <p class="movie-card__movie-description">${overview}</p> 
            </div>`;
  movieBox.innerHTML = markup;
}

async function renderMovieById(id) {
  try {
    const data = await getMovieByID(id);
    if (!data) {
      hideModal();
      onSpinnerDisabled();
      return;
    }
    makeMovieMarkup(data);
  } catch (error) {
    console.error(error.message);
  }
}

async function getMovieByID(movieID) {
  const API_KEY = 'e8d94f3e976148bda0a5c640d4df112b';
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=en-US`;

    onSpinnerEnabled();
    const response = await axios.get(url);
    onSpinnerDisabled();

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
