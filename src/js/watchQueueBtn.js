import { getStorageData, setStorageData, removeStorageData } from './ls-data';
import { selectedMovieId } from './modalMovie';

function inList(MovieId, list) {
  let arrList = [];
  let localListJson = getStorageData(list);
  if (localListJson) {
    arrList = [...localListJson];
  }
  const listSet = new Set(arrList);
  return listSet.has(MovieId);
}

export function textModalBtn(MovieId) {
  const btnQueue = document.querySelector('.control-btn--to-queue');
  const btnWatch = document.querySelector('.control-btn--to-watched');
  if (inList(MovieId, 'watchedList')) {
    btnWatch.textContent = 'Added to watched';
    btnWatch.disabled = true;
    function changeText() {
      btnWatch.disabled = false;
      btnWatch.textContent = 'Remove from watched';
      btnWatch.classList.add('active-button');
    }
    setTimeout(changeText, 500);
  } else {
    btnWatch.textContent = 'Add to watched';
    btnWatch.classList.remove('active-button');
    btnWatch.disabled = false;
  }

  if (inList(MovieId, 'queueList')) {
    btnQueue.textContent = 'Added to queue';
    btnQueue.disabled = true;
    function changeText() {
      btnQueue.disabled = false;
      btnQueue.textContent = 'Remove from queue';
      btnQueue.classList.add('active-button');
    }
    setTimeout(changeText, 750);
  } else {
    btnQueue.textContent = 'Add to queue';
    btnQueue.classList.remove('active-button');
    btnQueue.disabled = false;
  }
}

export function addWatchList() {
  const btnWatch = document.querySelector('.control-btn--to-watched');
  if (btnWatch.classList.contains('active-button')) {
    removeFromWatchedList(selectedMovieId);
  } else {
    let watchList = [];
    let localWatchListJson = getStorageData('watchedList');
    if (localWatchListJson) {
      watchList = [...localWatchListJson];
    }

    let queueList = [];
    let localQueueListJson = getStorageData('queueList');
    if (localQueueListJson) {
      queueList = [...localQueueListJson];
    }
    let queueSet = new Set(queueList);
    if (queueSet.has(selectedMovieId)) {
      removeStorageData('queueList');
      let index = queueList.indexOf(selectedMovieId);
      queueList.splice(index, 1);
      setStorageData('queueList', queueList);
    }

    let watchSet = new Set(watchList);
    if (watchSet.has(selectedMovieId)) {
      textModalBtn(selectedMovieId);
    } else {
      watchList.push(selectedMovieId);
      setStorageData('watchedList', watchList);
      textModalBtn(selectedMovieId);
    }
  }
}

export function addQueueList() {
  const btnQueue = document.querySelector('.control-btn--to-queue');
  if (btnQueue.classList.contains('active-button')) {
    removeFromQueueList(selectedMovieId);
  } else {
    let queueList = [];
    let localQueueListJson = getStorageData('queueList');
    if (localQueueListJson) {
      queueList = [...localQueueListJson];
    }

    let watchList = [];
    let localWatchListJson = getStorageData('watchedList');
    if (localWatchListJson) {
      watchList = [...localWatchListJson];
    }
    let watchSet = new Set(watchList);
    if (watchSet.has(selectedMovieId)) {
      removeStorageData('watchedList');
      let index = watchList.indexOf(selectedMovieId);
      watchList.splice(index, 1);
      setStorageData('watchedList', watchList);
    }

    const queueSet = new Set(queueList);
    if (queueSet.has(selectedMovieId)) {
      textModalBtn(selectedMovieId);
    } else {
      queueList.push(selectedMovieId);
      setStorageData('queueList', queueList);
      textModalBtn(selectedMovieId);
    }
  }
}

function removeFromQueueList(MovieId) {
  let queueList = [];
  let localQueueListJson = getStorageData('queueList');
  if (localQueueListJson) {
    queueList = [...localQueueListJson];
  }

  removeStorageData('queueList');
  let index = queueList.indexOf(MovieId);
  queueList.splice(index, 1);
  setStorageData('queueList', queueList);

  textModalBtn();
}

function removeFromWatchedList(MovieId) {
  let watchList = [];
  let localWatchListJson = getStorageData('watchedList');
  if (localWatchListJson) {
    watchList = [...localWatchListJson];
  }

  removeStorageData('watchedList');
  let index = watchList.indexOf(MovieId);
  watchList.splice(index, 1);
  setStorageData('watchedList', watchList);

  textModalBtn();
}
