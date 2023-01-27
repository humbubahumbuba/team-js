import { getTrendMovies, getGenresMovies } from "./api-fetch"



const mainGallery = document.querySelector('.mainGallery');
const galleryList = document.querySelector('.movieList');
getTrendMovies().then(movies => createMarkupOfTrendingMovies(movies)).catch(err => console.log(err))

getGenresMovies();

function createMarkupOfTrendingMovies(obj) {
    if (obj.results.length) {
        const markup = obj.results.map(({
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
        <h2 class="movieCard__title">${title || name}</h2>
        <p class="movieCard__info"> | ${new Date(
            release_date || first_air_date
        ).getFullYear()}
          <span class="movieCard__rate">${vote_average.toFixed(1)}</span></p>
      </div>
      </li>
`
        )
            .join('');
        galleryList.insertAdjacentHTML('afterBegin', markup);
    }
}