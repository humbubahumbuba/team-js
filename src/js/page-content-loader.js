// *** PAGE CONTENT LOAD *** //

// import movie content fetch fn
import { getTrendMovies, getGenresMovies } from "./api-fetch";
// import localStorage getter, setter and keys
import { getStorageData, setStorageData } from "./ls-data";
import { lskeys } from "./ls-data";
const { GENRES, HOME_CONTENT, CRT_CONTENT, CRT_USER, TMP_QUEUE, TMP_WATCHED } = lskeys;


// check for key updates for each page load //
(function updateKeys() {
    // keys to handle
    const processedKeys = [ GENRES, HOME_CONTENT, CRT_CONTENT ];

    // for each invalid (empty) key
    // load value from api
    processedKeys.forEach(key => {
        if (!getStorageData(key)) {
            loadPageContent(key); 
        }
    })

})();


export function isOnHomePage() {
    const currentPageURL = window.location.href;
    // home page urls and analogs
    // change 3rd option when fixed empty string search
    const HOME_URLS = [
        'http://localhost:1234/', 
        'http://localhost:1234/index.html',
        'http://localhost:1234/index.html?searchQuery='
    ];

    return HOME_URLS.includes(currentPageURL);
}


// load data from API to localStorage //
async function loadPageContent(lsKey, page=1) {

    if (lsKey === GENRES) {
        const apiData = await getGenresMovies();
        setStorageData(lsKey, apiData);
    }

    if (lsKey === HOME_CONTENT) {
        const apiData = await getTrendMovies();
        setStorageData(lsKey, apiData);
    }

    if (lsKey === CRT_CONTENT) {
        // load home page content
        // if current page is home page
        if (isOnHomePage()) {
            const homePageData = await getTrendMovies();
            setStorageData(lsKey, homePageData);
            return;
        }

        // add API query response handling
        const apiData = await getQueryMovies(query, page);
        setStorageData(lsKey, apiData);        
    }
}
// end load //


// process user data //
// check if any user
function isLoggedIn() { 
    let currentUser = getStorageData(CRT_USER);
    return currentUser;
}

// if no user logged in - use temporary queue and watched
if (!isLoggedIn()) {
    setStorageData(TMP_QUEUE, []);
    setStorageData(TMP_WATCHED, []);
}
// end processing //


// export data from localStorage by key //
// get promise data from ls
export async function getPromisedData(key) {
    let data = getStorageData(key);
    try {
        await new Promise(function (resolve) {
            data = getStorageData(key);

            setTimeout(function () {
                resolve();
            }, 1000);
        });
        data = getStorageData(key);
        return data;
    } 
    catch (err) {
        return console.error(err);
    }
}
// end export //


// ADD-REMOVE DATA FROM QUEUE-WATCHED //
// export functions
export function addMovieToQueue(movie) {
    addMovie(movie, TMP_QUEUE);
}

export function addMovieToWatched(movie) {
    addMovie(movie, TMP_WATCHED);
}

export function removeMovieFromQueue(movieId) {
    removeMovie(movieId, TMP_QUEUE);
}

export function removeMovieFromWatched(movieId) {
    removeMovie(movieId, TMP_WATCHED);
}


// add data to ls (query/watched)
async function addMovie(movie, key) {
    let data = getStorageData(key);

    try {
        await new Promise(function (resolve) {
            data = getStorageData(key);

            setTimeout(function () {
                resolve();
            }, 100);
        });

        // check if any user currently logged in
        if (!isLoggedIn()) {
            data.push(movie);
            setStorageData(key, data);
        }
        // add else when auth ready
    }
    catch (err) {
        console.error(err);
    }
}

// remove data from ls (query/watched)
async function removeMovie(movieId, key) {
    let data = getStorageData(key);

    try {
        await new Promise(function (resolve) {
            data = getStorageData(key);

            setTimeout(function () {
                resolve();
            }, 100);
        });

        if (!isLoggedIn()) {
            // find movie index by id
            const objWithIdIndex = data.findIndex((movie) => movie.id === movieId);

            // if found - remove from list
            if (objWithIdIndex > -1) {
                data.splice(objWithIdIndex, 1);
            }

            setStorageData(key, data);
        }
        // add else when auth ready
    }
    catch (err) {
        console.error(err);
    }
}
