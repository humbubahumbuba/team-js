// *** PAGE CONTENT LOAD, SAVE & RENDER *** //

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
let currentPageURL = window.location.href;
// home page urls and analogs
// change 3rd option when fixed empty string search
const homePageURL = ['http://localhost:1234/', 
                     'http://localhost:1234/index.html',
                     'http://localhost:1234/index.html?searchQuery='];

if (!currentPageData) {
    if (homePageURL.includes(currentPageURL)) {
        loadPageContent(CRT_CONTENT, HOME_CONTENT);
    }
}

// *** initload end *** //




// *** API data loader *** //

export async function loadPageContent(lsKey, page=1) {

    if (lsKey === GENRES) {
        const response = await getGenresMovies();
        setStorageData(lsKey, response);
    }

    if (lsKey === HOME_CONTENT) {
        const response = await getTrendMovies();
        setStorageData(lsKey, response.results);
    }

    if (lsKey === CRT_CONTENT) {
        // if current page is home page
        if (page === HOME_CONTENT) {
            const response = await getTrendMovies();
            setStorageData(lsKey, response.results);
            return;
        }

        // add API query response handling
        const response = await getQueryMovies(query, page);
        setStorageData(lsKey, response.results);        
    }

}

// *** end of loader *** //




// *** EXPORT FUNCTIONS FOR LOCALSTORAGE KEYS *** //

// get trend movies for homepage render
export async function fetchStorageData(key) {
    let data = await getStorageData(key);

    if (data) {
        // console.log("Log inside export fn: ", data);
        return data;
    }
}


// 
// export async function getCurrentPageMovies() {

// }



// *** //




// *** User data *** //

// check if any user
const currentUser = getStorageData(CRT_USER);

// if no user logged in - use temporary queue and watched
if (!currentUser) {
    setStorageData(TMP_QUEUE, []);
    setStorageData(TMP_WATCHED, []);
}


// functions for adding to queue/watched



// function for importing temporary queue/watched to logged in user



// *** //
