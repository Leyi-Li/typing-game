'use strict';

var userName = prompt('What is your name?');
var playerList = [];
var index = 0;
var nameExist = false;
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
 }
}

//see if the name is in the playerList
function checknameList(){
  userName = userName.toUpperCase();
  for (var i = 0; i < playerList.length; i++) {
    if (playerList[i].name === userName){
      nameExist = true;
      type();
      playerList[i].playing = true;
    } else { 
      playerList[i].playing = false;
    }
  } if (nameExist === false){
    type();
    playerList.push(new Player(userName));
  }
}

function Player(name) { 
  this.name = name;
  this.score = 0;
  this.playing = true;
}

function type() { 
  var letter = '';
  var welcomeBackWords = `${userName}, WELCOME BACK TO THE GAME!`;
  var welcomeWords = `${userName}, WELCOME TO THE GAME!`;

  if(nameExist === false) {
    letter = welcomeWords.slice(0, index++);
    document.getElementById('welcomeWords').textContent = letter;
    if (letter.length === welcomeWords.length) { 
      index = letter.length;
    }
    setTimeout(type,200);
  } else if (nameExist){ 
    letter = welcomeBackWords.slice(0, index++);
    document.getElementById('welcomeWords').textContent = letter;
    if (letter.length === welcomeBackWords.length) { 
      index = letter.length;
    }
    setTimeout(type,200);
  }
}