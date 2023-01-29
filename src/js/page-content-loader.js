// *** PAGE CONTENT LOAD *** //

// import movie content fetch fn
import { getTrendMovies, getGenresMovies } from "./api-fetch";
// import localStorage getter, setter and keys
import { getStorageData, setStorageData } from "./ls-data";
import { lskeys } from "./ls-data";
const { GENRES, HOME_CONTENT, CRT_CONTENT, CRT_USER, TMP_QUEUE, TMP_WATCHED } = lskeys;


// *** Load data on 1st visit (initload) *** //

// get saved values of genres
// load genres once if no value
const genres = getStorageData(GENRES);

if (!genres) { 
    loadPageContent(GENRES); 
}

// load trendy movies for homepage once
const trendy = getStorageData(HOME_CONTENT);

if (!trendy) {
    loadPageContent(HOME_CONTENT);
}

// load current once
let currentPageData = getStorageData(CRT_CONTENT);

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



if (!currentPageData) {
    if (isOnHomePage()) {
        loadPageContent(CRT_CONTENT, HOME_CONTENT);
    }
}

// *** initload end *** //




// *** IMPORT DATA FROM API TO LS *** //

async function loadPageContent(lsKey, page=1) {

    if (lsKey === GENRES) {
        const response = await getGenresMovies();
        setStorageData(lsKey, response);
    }

    if (lsKey === HOME_CONTENT) {
        const response = await getTrendMovies();
        setStorageData(lsKey, response);
    }

    if (lsKey === CRT_CONTENT) {
        // if current page is home page
        if (page === HOME_CONTENT) {
            const response = await getTrendMovies();
            setStorageData(lsKey, response);
            return;
        }

        // add API query response handling
        const response = await getQueryMovies(query, page);
        setStorageData(lsKey, response);        
    }
}

// *** end import *** //


// *** EXPORT DATA FROM LOCALSTORAGE BY KEY *** //

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

// *** end export *** //


// *** ADD/REMOVE DATA FROM QUEUE/WATCHED *** //

// write data to ls (query/watched)
export async function addMovieToQueue(movie) {
    let data = getStorageData(TMP_QUEUE);

    try {
        await new Promise(function (resolve) {
            data = getStorageData(TMP_QUEUE);

            setTimeout(function () {
                resolve();
            }, 100);
        });

        // if any error here - await for currentUser logged in
        // then check if currentUser
        // should work for now
        if (!isLoggedIn()) {
            console.log("Not logged in!");
            data.push(movie);
            setStorageData(TMP_QUEUE, data);
            return data;
        }
        // add else when auth ready
    }
    catch (err) {
        console.error(err);
    }
}


export async function addMovieToWatched(movie) {
    try {
        // if any error here - await for currentUser logged in
        // then check if currentUser
        // should work for now
        if (!isLoggedIn()) {
            const data = getStorageData(TMP_WATCHED);
            data.push(movie);
            setStorageData(TMP_WATCHED, data);
        }
        // add else when auth ready
    }
    catch (err) {
        console.error(err);
    }
}


export async function removeMovieFromQueue(movieId) {
    try {
        // if any error here - await for currentUser logged in
        // then check if currentUser
        // should work for now
        if (!isLoggedIn()) {
            const data = getStorageData(TMP_QUEUE);
            
            // find movie index by id
            const objWithIdIndex = data.findIndex((movie) => movie.id === movieId);

            // if found - remove from list
            if (objWithIdIndex > -1) {
                data.splice(objWithIdIndex, 1);
            }

            setStorageData(TMP_QUEUE, data);
        }
        // add else when auth ready
    }
    catch (err) {
        console.error(err);
    }
}


export async function removeMovieFromWatched(movieId) {
    try {
        // if any error here - await for currentUser logged in
        // then check if currentUser
        // should work for now
        if (!isLoggedIn()) {
            const data = getStorageData(TMP_WATCHED);

            const objWithIdIndex = data.findIndex((movie) => movie.id === movieId);

            if (objWithIdIndex > -1) {
                data.splice(objWithIdIndex, 1);
            }

            setStorageData(TMP_WATCHED, data);
        }
        // add else when auth ready
    }
    catch (err) {
        console.error(err);
    } 
}


// example of receiving data from outer function/module
// functional test
// getPromisedData(HOME_CONTENT).then(function(result) {
//     // use the result here
//     console.log(data);
// });


// *** //




// *** User data *** //

// check if any user
async function isLoggedIn() { 
    try {
        await new Promise(function (resolve) {
            let currentUser = getStorageData(CRT_USER);

            setTimeout(function () {
                resolve();
            }, 1000);
        });
        currentUser = getStorageData(CRT_USER);
        return currentUser;
    } 
    catch (err) {
        return console.error(err);
    }
}


isLoggedIn().then(function(result) {
    // use the result here
    // shows userId if logged in
    // console.log(result);
});


// if no user logged in - use temporary queue and watched
if (!isLoggedIn()) {
    setStorageData(TMP_QUEUE, []);
    setStorageData(TMP_WATCHED, []);
}


// functions for adding to queue/watched



// function for importing temporary queue/watched to logged in user



// *** //
