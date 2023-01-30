const scrollUpBtn = document.querySelector('.scrollUpBtn');
const rootEl = document.documentElement;



onScrollFunction();
window.onscroll = function () {
  onScrollFunction();
};


function onScrollFunction() {
  if (
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    scrollUpBtn.classList.add('showBtn');
  } else {
    scrollUpBtn.classList.remove('showBtn');
  }
}

scrollUpBtn.addEventListener('click', scrollUpTop);


function scrollUpTop() {
  rootEl.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}