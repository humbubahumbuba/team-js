export const lskeys = {
    // const keys for localStorage
    CRT_USER: 'current-user',
    TMP_QUEUE: 'temp-queue',
    TMP_WATCHED: 'temp-watched',
    HOME_CONTENT: 'home-page-content',
    CRT_CONTENT: 'current-page-content',
    GENRES: 'movie-genres',
}

// get data by key
export function getStorageData(key) {
	return JSON.parse(localStorage.getItem(key));
}

// set data 
export function setStorageData(key, data) {
    const dataJSON = JSON.stringify(data);
    localStorage.setItem(key, dataJSON);
}
