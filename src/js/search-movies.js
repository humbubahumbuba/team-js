import { getQueryMovies } from './api-fetch';
import { createMarkupOfTrendingMovies, textError, galleryList, getDataMoviesTrend, onFooterFixed, onFooterNoFixed } from './render-cards';
import { onSpinnerDisabled, onSpinnerEnabled } from './loader-spinner';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import '/src/sass/components/_pagination.scss';

const searchForm = document.querySelector('#search-form');
export const container = document.querySelector('.tui-pagination');
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
searchForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
    evt.preventDefault();
    const typeName = searchForm[0].value;
    localStorage.setItem('Search', typeName)

    if (!typeName.length) {
        textError.classList.add('is-active');
        setTimeout(() => {
            textError.classList.remove('is-active');
          }, 2000);
        pagination.reset(movies.total_results);
    }
    else {
        onFooterFixed();
        onSpinnerEnabled()
        galleryList.innerHTML = '';
        getQueryMovies(typeName, 1).then(movies => {
            onSpinnerDisabled();
            if (!movies.total_results) {
                textError.classList.add('is-active');
                pagination.movePageTo(1);
                let homeContent = getDataMoviesTrend();
                createMarkupOfTrendingMovies(homeContent);
            }
            textError.classList.remove('is-active')
            createMarkupOfTrendingMovies(movies);
            pagination.reset(movies.total_results)
            onFooterNoFixed();
        }).catch(err => console.log(err));
    }
}
pagination.on('afterMove', async function (eventData) {
    var currentPage = eventData.page;
    galleryList.innerHTML = '';
    onFooterFixed();
    onSpinnerEnabled();
    const data = await getQueryMovies(localStorage.getItem('Search'), currentPage);
    try {
        onSpinnerDisabled();
        createMarkupOfTrendingMovies(data);
        onFooterNoFixed();
    } catch (err) {
        console.log(err);
    }
});
