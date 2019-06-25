'use strict';

var userName = prompt('What is your name?');

//We need to put the user names into local storage
//if there is the same name on LS then on the front page it says welcome back xxx!
//if there is no same names on LS then on the front page it says Hi xx!

var welcomeWords = document.getElementById('welcomeWords');
if(userName !== null){
  welcomeWords.textContent = `${userName}, Welcome To The Game!`;
}else{
  welcomeWords.textContent = 'Welcome to the game!';
}
