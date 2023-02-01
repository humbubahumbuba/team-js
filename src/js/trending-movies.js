import { getTrendMovies } from './api-fetch';
import { createMarkupOfTrendingMovies, galleryList, onFooterFixed, onFooterNoFixed } from './render-cards';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import '/src/sass/components/_pagination.scss';
import { onSpinnerDisabled, onSpinnerEnabled } from './loader-spinner';

const container = document.querySelector('.tui-pagination');
const options = {
    totalItems: 1000,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
};

const pagination = new Pagination(container, options);

pagination.on('afterMove', async function (eventData) {
    var currentPage = eventData.page;
    galleryList.innerHTML = '';
    onFooterFixed();
    onSpinnerEnabled();
    const data = await getTrendMovies(currentPage);
    try {
        onSpinnerDisabled();
        createMarkupOfTrendingMovies(data);
        onFooterNoFixed();
    } catch (err) {
        console.log(err)
    }
});