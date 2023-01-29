import { getQueryMovies } from './api-fetch';
import { createMarkupOfTrendingMovies, textError } from './render-cards';



const searchForm = document.querySelector('#search-form');
const btnSubmit = document.querySelector('.input__search-btn');
// console.log(searchForm)
searchForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
    evt.preventDefault();
    const typeName = searchForm[0].value;

    if (!typeName.length) {
        textError.classList.add('is-active');
    }
    else {
        getQueryMovies(typeName, qPage = 1).then(movies => createMarkupOfTrendingMovies(movies)).catch(err => console.log(err))
    }
}

