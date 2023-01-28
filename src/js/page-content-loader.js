// *** CURRENT PAGE CONTENT STORE & RENDER *** //

// import movie content fetch fn
import { getTrendMovies, getGenresMovies } from "./api-fetch";
// import localStorage getter, setter and keys
import { getStorageData, setStorageData } from "./ls-data";
import { lskeys } from "./ls-data";
const { HOME_CONTENT, GENRES, CRT_CONTENT, CRT_USER } = lskeys;


// !!! add initLoad() wrapper function for 1st page load
// initload start

// get saved values of genres
// load genres once if no value
const genres = getStorageData(GENRES);

if (!genres) { 
    loadPageContent(GENRES); 
}


// load current once
const current = getStorageData(CRT_CONTENT);

if (!current) {
    loadPageContent(CRT_CONTENT);
}


// load trendy after current
// load trendy movies for homepage once
const trendy = getStorageData(HOME_CONTENT);

if (!trendy) {
    loadPageContent(HOME_CONTENT);
}
// initload end


// api data loader
export async function loadPageContent(lsKey) {
    if (lsKey === GENRES) {
        const response = await getGenresMovies();
        setStorageData(lsKey, response);
    }

    if (lsKey === CRT_CONTENT) {
        /* fix here */ 

        // check if current page is home page
        const crtPage = document.querySelector('head title').textContent;

        if (crtPage === "Filmoteka") {
            const response = await getTrendMovies();

            setStorageData(lsKey, response);
            setStorageData(HOME_CONTENT, response);
        } else {
            console.log("else");
        }
    }
}


/* 
//load content on page load

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