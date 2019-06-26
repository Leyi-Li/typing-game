'use strict';

var playerList = getDataFromLocalStorage('playerList');
playerList.sort(function(a,b) {return b.score - a.score;});
console.log(playerList);

var list = document.getElementById('hiScoreList');
var listItem; 

for (var i = 0; i <= playerList.length; i++) {
  listItem = document.createElement('li');
  listItem.textContent = `${i+1}. ${playerList[i].name}          ${playerList[i].score}`;
  list.appendChild(listItem);
}