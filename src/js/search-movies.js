import { getQueryMovies } from './api-fetch';
import { createMarkupOfTrendingMovies, textError } from './render-cards';
import { onSpinnerDisabled, onSpinnerEnabled } from './loader-spinner';
import { galleryList } from './render-cards';
import { getStorageData } from './ls-data';
import { lskeys } from './ls-data';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import '/src/sass/components/_pagination.scss';
import { getQueryMovies } from './api-fetch';



const searchForm = document.querySelector('#search-form');

const container = document.querySelector('.tui-pagination');
const options = {
    totalItems: 10000,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',

};

const pagination = new Pagination(container, options);
// console.log(searchForm)
searchForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
    evt.preventDefault();
    const typeName = searchForm[0].value;
    localStorage.setItem('Search', typeName)

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
            pagination.reset(movies.total_results)
            createMarkupOfTrendingMovies(movies);

        }).catch(err => console.log(err));

    }
}
pagination.on('afterMove', async function (eventData) {
    var currentPage = eventData.page;

    galleryList.innerHTML = '';
    const data = await getQueryMovies(localStorage.getItem('Search'), currentPage);
    try {
        createMarkupOfTrendingMovies(data);
    } catch (err) {
        console.log(err);
    }

});
