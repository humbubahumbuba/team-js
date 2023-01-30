
// const themeSwitchers = document.querySelectorAll('.change-theme');

// themeSwitchers.forEach(switcher => {
//     switcher.addEventListener('click', function () {
//         let theme = this.dataset.theme
//         applyTheme(theme);
//         // localStorage.setItem('theme', theme)
//     });
// });

// function applyTheme(themeName) {
//     let themeUrl = `sass/components/_theme-${themeName}.scss`;
//     document.querySelector('[title="theme"]').setAttribute('href', themeUrl);
// };

// let activeTheme = localStorage.getItem('theme');

// if (activeTheme === null) {
//     applyTheme('light');
// } else {
//     applyTheme(activeTheme);
// }

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