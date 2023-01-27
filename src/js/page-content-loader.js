// *** CURRENT PAGE CONTENT STORE & RENDER *** //

// import movie content fetch fn
import { getTrendMovies, getGenresMovies } from "./api-fetch";
// import localStorage getter, setter and keys
import { getStorageData, setStorageData } from "./ls-data";
import { lskeys } from "./ls-data";
const { HOME_CONTENT, GENRES, CRT_CONTENT, CRT_USER } = lskeys;


// get saved values of genres and trendy movies
const genres = getStorageData(GENRES);
const trendy = getStorageData(HOME_CONTENT);

// load genres once if no value
if (!genres) { 
    loadPageContent(GENRES); 
}

// load trendy movies for homepage once
if (!trendy) {
    loadPageContent(HOME_CONTENT); 
}



// api data loader
export async function loadPageContent(lsKey) {
    if (lsKey === HOME_CONTENT) {
        const response = await getTrendMovies();
        setStorageData(lsKey, response);
        return response;
    }
    if (lsKey === GENRES) {
        const response = await getGenresMovies();
        setStorageData(lsKey, response);
    }
}


/* load content on page load
if (!pageContent) {
    loadPageContent();
}
*/


/*
// load current page content once
// do not load if curent page = home page
if (page === homePage) {
	loadPageContent(pageContent);
} else {
	setStorageData(CRT_CONTENT, apiRequest(query));
	pageContent = getStorageData(CRT_CONTENT);
	loadPageContent(pageContent);
}


// check if any user is currently logged in
const currentUser = getStorageData(CRT_USER);

// if no user logged in - use temporary queue and watched
if (!currentUser) {
	setStorageData(TMP_QUEUE, []);
	setStorageData(TMP_WATCHED, []);
}


// functions for adding to queue/watched


// function for importing temporary queue/watched to logged in user



// *** //

*/