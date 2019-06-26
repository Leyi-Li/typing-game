'use strict';

var playerList = getDataFromLocalStorage('playerList');
playerList.sort(function(a,b) {return a.score - b.score;});
alert(playerList)

