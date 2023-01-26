const openModal = document.querySelector('.js-click');
const modalMovie = document.querySelector('.js-modal-movie');
const closeModalBtn = document.querySelector('.js-close-btn');

openModal.addEventListener('click', onMovieClick);

closeModalBtn.addEventListener('click', onCloseModalBtnClick);

function onCloseModalBtnClick() {
    hideModal();
};

function onMovieClick(event) {
    showModal();
        document.addEventListener('keydown', closeModalOnEscapePress);
};

function closeModalOnEscapePress(event) {
    if (event.code === 'Escape') {
        hideModal();
    };
};

function showModal() {
    modalMovie.classList.remove('is-hidden');
    document.body.classList.add('.no-scroll');
};

function hideModal() {
    modalMovie.classList.add('is-hidden');
    document.body.classList.remove('.no-scroll');
    document.removeEventListener('keydown', closeModalOnEscapePress);
};