import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import '/src/sass/components/_pagination.scss';

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
