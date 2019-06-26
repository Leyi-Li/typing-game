'use strict';

var playerList = getDataFromLocalStorage('playerList');

for (var i = 0; i < playerList.length; i++) { 
  if(playerList[i].playing === true) { 
    var personalHighScore = playerList[i].score;
    break;
  }
} 

function drawScore() {
  var updateScore = requestAnimationFrame(drawScore);
  ctx.font = '25px Gadget';
  ctx.fillStyle = 'white';
  ctx.fillText('Score: '+ score, 8, 25);
  ctx.fillText('Personal High: '+ personalHighScore, 8, 50);
  ctx.fillText('Local High: '+ playerList[0].score, 8, 75);
}

