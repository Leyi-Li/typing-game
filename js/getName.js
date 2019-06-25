'use strict';

var userName = prompt('What is your name?');
var nameList = [];
var welcomeWords = document.getElementById('welcomeWords');
checkLocalStorage();
checknameList();
addToLocalStorage('nameList', nameList);
//We need to put the user names into local storage
//if there is the same name on LS then on the front page it says welcome back xxx!
//if there is no same names on LS then on the front page it says Hi xx!

//see if the name is in the  LS
function checkLocalStorage(){
  if(localStorage.nameList){
    nameList = getDataFromLocalStorage("nameList");
// }else{
//   nameList.push(userName);
 }
}

//see if the name is in the nameList
function checknameList(){
  userName = userName.toUpperCase();
  if(nameList.includes(userName)){
    welcomeWords.textContent = userName + ', WELCOME BACK TO THE GAME!';
  }else if(userName === null){
    welcomeWords.textContent = 'WELCOME TO THE GAME!';
  }else{
    welcomeWords.textContent = `${userName}, WELCOME TO THE GAME!`;
    nameList.push(userName);
  }
}