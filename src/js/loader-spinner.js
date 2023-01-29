const spinnerEl = document.querySelector('.backdrop-loader-spinner');

function onSpinnerEnabled() {
  return spinnerEl.classList.remove('visually-hidden');
}
function onSpinnerDisabled() {
  return spinnerEl.classList.add('visually-hidden');
}

const logoRef = document.querySelector('.header__logo');
logoRef.addEventListener('click', e => {
  e.preventDefault();
  onSpinnerEnabled();
  setTimeout(() => {
    onSpinnerDisabled();
  }, 2000);
});

export { onSpinnerEnabled, onSpinnerDisabled };
