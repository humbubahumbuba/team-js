import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import '/src/sass/components/_pagination.scss';
import { watchedStorageData, queueStorageData } from './render-library';
console.log(watchedStorageData.length)
const container = document.querySelector('.tui-pagination');
const options = {
    totalItems: watchedStorageData.length || queueStorageData,
    itemsPerPage: 8,
    visiblePages: 5,
    page: 1,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
};

const pagination = new Pagination(container, options);

pagination.on('afterMove', function (eventData) {
    var currentPage = eventData.page;
    galleryList.innerHTML = '';
    // onFooterFixed();
    // onSpinnerEnabled();
    // const data =  getQueryMovies(localStorage.getItem('Search'), currentPage);
    // try {
    //     onSpinnerDisabled();
    //     createMarkupOfTrendingMovies(data);
    //     onFooterNoFixed();
    // } catch (err) {
    //     console.log(err);
    // }
});
