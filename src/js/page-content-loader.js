// *** PAGE CONTENT LOAD *** //

// import localStorage getter, setter and keys
import { lskeys } from "./ls-data";
const { GENRES, HOME_CONTENT, CRT_CONTENT, CRT_USER, TMP_QUEUE, TMP_WATCHED, STORAGE_USERS } = lskeys;
import { getStorageData, setStorageData,  } from "./ls-data";

// import movie content fetch fn
import { getTrendMovies, getGenresMovies, getQueryMovies } from "./api-fetch";


// fn check for key updates
function updateKeys() {
    // keys to handle
    const processedKeys = [ ...Object.values(lskeys) ];

    // if no user logged in - use temporary queue and watched
    if (!isLoggedIn()) {
        setStorageData(TMP_QUEUE, []);
        setStorageData(TMP_WATCHED, []);
    } else {
        // else import any temp lib
        importTempLibrary();
    }

    // for each invalid (empty) key
    // load value from api
    processedKeys.forEach(key => {
        if (!getStorageData(key)) {
            loadPageContent(key); 
        }
    })

};

// run on page reload
updateKeys();


export function isOnHomePage() {
    const currentPageURL = window.location.href;
    // home page urls and analogs
    const HOME_URLS = [
        // if hosted locally
        'http://localhost:1234/', 
        'http://localhost:1234/index.html',
        // and if deployed
        'https://humbubahumbuba.github.io/team-js/',
        'https://humbubahumbuba.github.io/team-js/index.html'
    ];

    return HOME_URLS.includes(currentPageURL);
}

// load data from API to localStorage //
async function loadPageContent(lsKey, page=1) {
    let value;

    if (lsKey === GENRES) {
        value = await getGenresMovies();
        setStorageData(lsKey, value);
        return;
    }

    if (lsKey === HOME_CONTENT) {
        // home page content is default trends 1st page
        value = await getTrendMovies(1);
        setStorageData(lsKey, value);
        return;
    }

    if (lsKey === CRT_CONTENT) {
        // load home page content
        // if current page is home page
        if (isOnHomePage()) {
            value = await getPromisedData(HOME_CONTENT);
            setStorageData(lsKey, value);
            return;
        }

        // add API query response handling
        value = await getQueryMovies(query, page);
        setStorageData(lsKey, value);  
        return;      
    }

    value = await getStorageData(lsKey);
    setStorageData(lsKey, value);
    return;
}
// end load //


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



// IMPORT TEMP QUEUE/WATCHED IF LOGGED-IN
// check if any user
function isLoggedIn() { 
    let currentUser = getStorageData(CRT_USER);
    return currentUser;
}


// import fn
export async function importTempLibrary() {
    let currentUserId = await getPromisedData(CRT_USER);
    let usersData = await getPromisedData(STORAGE_USERS);

    try {
        await new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, 500);
        });

        if (isLoggedIn()) {
            const params = [ TMP_QUEUE, TMP_WATCHED ];

            params.forEach(key => {
                if(getStorageData(key)) {
                    const param = key.slice(5, key.length);
                    const arr = getStorageData(key);

                    // find user index in data
                    const userIndex = usersData.findIndex((u) => u.userid === currentUserId);

                    // overwrite users data
                    usersData[userIndex][param].concat(arr);
                    setStorageData(key, []);
                }
            });

            updateKeys();
        }
    }
    catch (err) {
        console.error(err);
    }
};



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
    let currentUserId = getStorageData(CRT_USER);
    let usersData = getStorageData(STORAGE_USERS);

    try {
        await new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, 100);
        });

        // check if any user currently logged in
        if (!isLoggedIn()) {
            data = getStorageData(key);

            // do this if no logged in user
            if (isDuplicate(data, movie)) {
                console.log("Item already in the list!");
            } else {
                data.push(movie);
            }

            setStorageData(key, data);
        } else {
            // do this if user logged in
            data = getStorageData(key);
            currentUserId = getStorageData(CRT_USER);
            usersData = getStorageData(STORAGE_USERS);

            // find user index in data
            const userIndex = usersData.findIndex((u) => u.userid === currentUserId);

            // get key param and list of objects
            const param = key.slice(5, key.length);
            const userList = usersData[userIndex][param];

            // overwrite users data if not changed
            if (isDuplicate(userList, movie)) {
                console.log("Item already in the list!");
            } else {
                userList.push(movie);
            }

            // and pass it as storage value
            setStorageData(STORAGE_USERS, usersData);
        }
    }
    catch (err) {
        console.error(err);
    }
}


// remove data from ls (query/watched)
async function removeMovie(movieId, key) {
    let data = getStorageData(key);
    let currentUserId = getStorageData(CRT_USER);
    let usersData = getStorageData(STORAGE_USERS);

    try {
        await new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, 100);
        });

        if (!isLoggedIn()) {
            data = getStorageData(key);

            removeItemByIndex(data, "id", movieId);
            setStorageData(key, data);
        } else {
            data = getStorageData(key);
            currentUserId = getStorageData(CRT_USER);
            usersData = getStorageData(STORAGE_USERS);

            const param = key.slice(5, key.length);
            const userIndex = usersData.findIndex((u) => u.userid === currentUserId);

            removeItemByIndex(usersData[userIndex][param], "id", movieId);

            setStorageData(STORAGE_USERS, usersData);
        }
    }
    catch (err) {
        console.error(err);
    }
}



function removeItemByIndex(arr, itemId, searchedId) {
    // find item index by id
    const objWithIdIndex = arr.findIndex((item) => item[itemId] === searchedId);

    // if found - remove from list
    if (objWithIdIndex > -1) {
        arr.splice(objWithIdIndex, 1);
    }
}


function isDuplicate(arr, item) {
    return arr.find(el => el.id === item.id);
}
