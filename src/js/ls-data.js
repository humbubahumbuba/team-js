// LSDATA CHANGED

export const lskeys = {
    // const keys for localStorage
    CRT_USER: 'current-user',
    TMP_QUEUE: 'temp-queue',
    TMP_WATCHED: 'temp-watched',
    HOME_CONTENT: 'home-page-content',
    CRT_CONTENT: 'current-page-content',
    GENRES: 'movie-genres',
    STORAGE_USERS: 'users-data',
};


// initialize localStorage keys
(function initLoad() {
    if(localStorage.length === 0) {
        localStorage.clear();

        // create keys and assign values
        Object.values(lskeys).map(key => localStorage.setItem(key, null));
    }
})();
    

// get data by key
export function getStorageData(key) {
    try {
        const serializedData = localStorage.getItem(key);
        return serializedData === null ? undefined : JSON.parse(serializedData);
    } catch (error) {
        console.error("Get state error: ", error.message);
    }
}

// set data 
export function setStorageData(key, data) {
    try {
        const serializedData = JSON.stringify(data);
        localStorage.setItem(key, serializedData);
    } catch (error) {
        console.error("Set state error: ", error.message);
    }
}
