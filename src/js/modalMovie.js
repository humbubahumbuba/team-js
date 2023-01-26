const openModal = document.querySelector('.js-click');
const modal = document.querySelector('.js-modal');
const modalMovie = document.querySelector('.js-modal-movie');
const closeModalBtn = document.querySelector('.js-close-btn');

console.dir(modal);

openModal.addEventListener('click', () => {
    showModal()
})

closeModalBtn.addEventListener('click', onCloseModalBtn);

function onCloseModalBtn(event) {
    hideModal()
}

function showModal() {
    modal.classList.remove('is-hidden');
    modalMovie.classList.remove('is-hidden');
};

function hideModal() {
    modal.classList.add('is-hidden');
    modalMovie.classList.add('is-hidden');
};