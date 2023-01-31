import { getQueryMovies } from './api-fetch';
import { createMarkupOfTrendingMovies, textError } from './render-cards';
import { onSpinnerDisabled, onSpinnerEnabled } from './loader-spinner';
import { galleryList } from './render-cards';
import { getStorageData } from './ls-data';
import { lskeys } from './ls-data';



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
        onSpinnerEnabled()
        galleryList.innerHTML = '';
        getQueryMovies(typeName, qPage = 1).then(movies => {
            onSpinnerDisabled();
            if (!movies.total_results) {
                let homeContent = getStorageData(lskeys.HOME_CONTENT);
                createMarkupOfTrendingMovies(homeContent);
            }
            createMarkupOfTrendingMovies(movies);

        }).catch(err => console.log(err));

    }
}

