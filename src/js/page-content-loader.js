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
const currentPage = document.querySelector('head title').textContent;

if (!currentPageData) {
    loadPageContent(CRT_CONTENT);
}

// *** initload end *** //




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


// *** API data loader *** //

export async function loadPageContent(lsKey) {

    if (lsKey === GENRES) {
        const response = await getGenresMovies();
        setStorageData(lsKey, response);
    }

    if (lsKey === HOME_CONTENT) {
        const response = await getTrendMovies();
        setStorageData(lsKey, response.results);

        if (currentPage === "Filmoteka") {
            setStorageData(CRT_CONTENT, response.results);
        }
    }

    if (lsKey === CRT_CONTENT) {
        console.log("Loading current content");
    }
}

// *** end of loader *** //
