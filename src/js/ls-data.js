// localStorage keys + synchronous get/set

// const keys for localStorage
export const lskeys = {
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
  if (localStorage.length === 0) {
    localStorage.clear();

    // create keys and assign values
    const keys = Object.values(lskeys);
    keys.map(key => localStorage.setItem(key, 0));
  }
})();

// get data by key
export function getStorageData(key) {
  try {
    const serializedData = localStorage.getItem(key);
    return serializedData === null ? undefined : JSON.parse(serializedData);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

// set data
export function setStorageData(key, data) {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

// remove data
export function removeStorageData(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error('Remove state error: ', err);
  }
}
