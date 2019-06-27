function addScore() {
  playerList = getDataFromLocalStorage('playerList');
  for (var i = 0; i < playerList.length; i++) { 
    if (playerList[i].playing === true) { 
      if (playerList[i].score < score) { 
        playerList[i].score = score;
        break;
      }
    } 
  }
  playerList.sort(function(a,b) {return b.score - a.score;});
  addToLocalStorage('playerList', playerList);
}