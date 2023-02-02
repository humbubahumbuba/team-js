const body = document.querySelector('body');
const toggle = document.querySelector('#theme-switch-toggle');

toggle.addEventListener('change', event => {
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    localStorage.removeItem('darkTheme');
  } else {
    body.classList.add('dark');
    localStorage.setItem('darkTheme', 'true');
  }
});

let theme = localStorage.getItem('darkTheme');
function checkTheme(theme) {
  if (localStorage.getItem('darkTheme')) {
    body.classList.add('dark');
    toggle.checked = true;
  }
  return;
}
checkTheme();
