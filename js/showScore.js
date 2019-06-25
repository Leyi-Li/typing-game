function drawScore() {
    updateScore = requestAnimationFrame(drawScore);
    ctx.font = '16px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Score: '+score, 8, 20);
  }

