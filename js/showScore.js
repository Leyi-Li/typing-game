'use strict';

function drawScore() {
  var updateScore = requestAnimationFrame(drawScore);
  ctx.font = '25px Gadget';
  ctx.fillStyle = 'white';
  ctx.fillText('Score: '+ score, 8, 25);
}

