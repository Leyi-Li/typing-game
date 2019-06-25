'use strict';

function randomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor() {
  return `rgb(${randomIntBetween(0,255)},${randomIntBetween(0,255)}, ${randomIntBetween(0,255)})`;
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function randomNumberBetween(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function addToLocalStorage(storageName,storageData){
  localStorage.setItem(storageName,JSON.stringify(storageData));
}

function getDataFromLocalStorage(storageName){
  return JSON.parse(localStorage.getItem(storageName));
}
