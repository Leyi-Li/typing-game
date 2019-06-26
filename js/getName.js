'use strict';

var userName = prompt('What is your name?');
var playerList = [];
var welcomeWords = document.getElementById('welcomeWords');
checkLocalStorage();
checknameList();
addToLocalStorage('playerList', playerList); 

//We need to put the user names into local storage
//if there is the same name on LS then on the front page it says welcome back xxx!
//if there is no same names on LS then on the front page it says Hi xx!

//see if the name is in the  LS
function checkLocalStorage(){
  if(localStorage.playerList){
    playerList = getDataFromLocalStorage('playerList');
// }else{
//   playerList.push(userName);
 }
}

//see if the name is in the playerList
function checknameList(){
  userName = userName.toUpperCase();
  var nameExist = false;
  for (var i = 0; i < playerList.length; i++) {
    if (playerList[i].name === userName){
      welcomeWords.textContent = userName + ', WELCOME BACK TO THE GAME!';
      nameExist = true;
      playerList[i].playing = true;
    } else { 
      playerList[i].playing = false;
    }
  }
  if (userName === null){
    welcomeWords.textContent = 'WELCOME TO THE GAME!';
  } else if (nameExist === false){
    welcomeWords.textContent = `${userName}, WELCOME TO THE GAME!`;
    playerList.push(new Player(userName));
  }
}

function Player(name) { 
  this.name = name;
  this.score = 0;
  this.playing = true;
}