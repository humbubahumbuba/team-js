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



////////////////

// const saveLs = (key, value) => {
//   try {
//     const serializedState = JSON.stringify(value);
//     localStorage.setItem(key, serializedState);
//   } catch (error) {
//     console.error('Set state error: ', error.message);
//   };
// };

// const loadLs = key => {
//   try {
//     const serializedState = localStorage.getItem(key);
//     return serializedState === null ? undefined : JSON.parse(serializedState);
//   } catch (error) {
//     console.error('Get state error: ', error.message);
//   };
// };


// const themeBtn = document.getElementById('toggle-theme-btn');
// const sun = document.querySelector('.sun');
// const moon = document.querySelector('.moon');

// const themeValue = loadLs('theme') ? loadLs('theme') : 'light';
// saveLs('theme', themeValue);
// document.body.classList.add(themeValue);
// if (themeValue === 'light') {
// 	sun.style.visibility = 'hidden';
// } else {
// 	moon.style.visibility = 'hidden';
// };
// themeBtn.addEventListener('click', () => {
// 	const val = loadLs('theme');
// 	if (val === 'light') {
// 		document.body.classList.add('dark');
// 		if(location.pathname.split("/").slice(-1) != 'header.html') {
// 			document.querySelector('.tui-pagination').classList.add('dark');
// 		};
// 		document.querySelector('.modal-movie').classList.add('dark');
// 		moon.style.visibility = 'hidden';
// 		sun.style.visibility = 'visible';
// 		saveLs('theme', 'dark');
// 	} else {
// 		document.body.classList.remove('dark');
// 		if(location.pathname.split("/").slice(-1) != 'header.html') {
// 			document.querySelector('.tui-pagination').classList.remove('dark');
// 		};
// 		document.querySelector('.modal-movie').classList.remove('dark');
// 		sun.style.visibility = 'hidden';
// 		moon.style.visibility = 'visible';
// 		saveLs('theme', 'light');
// 	};
// });

// if(location.pathname.split("/").slice(-1) != 'library.html') {
// 	if(loadLs('theme') === 'dark')
// 	document.querySelector('.tui-pagination').classList.add('dark')
// };
