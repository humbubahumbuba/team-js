//тимчасовий костиль
import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'e8d94f3e976148bda0a5c640d4df112b';

export async function getTrendMovies() {
    try {
        const response = await axios.get(`${BASE_URL}trending/all/day?api_key=${API_KEY}`)
        // console.log(response.data)
        return response.data;

    } catch (err) {
        console.log(err);
    }
}
//тимчасовий костиль

const backdgop = document.querySelector('.js-backdrop');
const modalMovie = document.querySelector('.js-modal-movie');
const movieBox = document.querySelector('.js-movie-box');
const closeModalBtn = document.querySelector('.js-close-btn');
const movieList = document.querySelector('.movieList');

closeModalBtn.addEventListener('click', onCloseModalBtnClick);
movieList.addEventListener('click', onMovieClick);
backdgop.addEventListener('click', onBackdropClick);

function onMovieClick(event) {
    const movieCard = movieList.firstElementChild;
    const isMovieCard = event.target.classList.contains('movieCard__img') || event.target.classList.contains('movieCard__text');
    if (isMovieCard) {
        const movieId = movieCard.getAttribute('data');
        showModal();
        document.addEventListener('keydown', closeModalOnEscapePress);
        getTrendMovies().then(response => {
            renderSelectedMovieAtModal(response.results[2])
        })//тимчасовий костиль
    };
};

function closeModalOnEscapePress(event) {
    if (event.code === 'Escape') {
        hideModal();
        document.removeEventListener('keydown', closeModalOnEscapePress);
    };
};

function onBackdropClick(event) {
    if (event.target === event.currentTarget) {
        hideModal();
    };
};

function showModal() {
    modalMovie.parentElement.classList.remove('is-hidden');
    modalMovie.classList.remove('is-hidden');
    document.body.classList.add('no-scroll');
};

function hideModal() {
    modalMovie.parentElement.classList.add('is-hidden');
    modalMovie.classList.add('is-hidden');
    document.body.classList.remove('no-scroll');
};

function onCloseModalBtnClick() {
    hideModal();
};

function renderSelectedMovieAtModal(date) {
    const { adult,
        backdrop_path,
        genre_ids,
        id,
        media_type,
        original_language,
        original_title,
        overview,
        popularity,
        poster_path,
        release_date,
        title,
        video,
        vote_average,
        vote_count } = date;
        const imageBaseUrl = 'https://image.tmdb.org/t/p/w500/';
    const markup = `
        <img class="modal-movie__poster" src="${imageBaseUrl}/${poster_path}" alt="${title}" loading="lazy" >
            <div class="movie-card">
                <h2 class="movie-card__title">${title}</h2>
                <table class="info-table">
                    <tbody>
                        <tr>
                            <td class="info-table__classification">Vote / Votes</td>
                            <td class="info-table__classification-data">
                                <span class="rating rating--vote">${vote_average}</span>
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
                            <td class="info-table__classification-data">${original_title}</td>
                        </tr>
                        <tr>
                            <td class="info-table__classification">Genres</td>
                            <td class="info-table__classification-data">${genre_ids}</td>
                        </tr>
                    </tbody>
                </table>
                <h3 class="movie-card__about-title">About</h3>
                <p class="movie-card__movie-description">${overview}</p> 
                <ul class="control-btns">
                    <li><button class="control-btn control-btn--to-watched" type="button">add to Watched</button></li>
                    <li><button class="control-btn control-btn--to-queue" type="button">add to queue</button></li>
                </ul>
            </div>`
    movieBox.innerHTML = markup;
};