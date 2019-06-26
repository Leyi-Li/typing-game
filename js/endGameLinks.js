playAgainX = 150;
playAgainY = canvas.height/2;
HomeX = 150;
HomeY = canvas.height/2;


function homePageLink() { 
  ctx.font = '30px sans-serif';
  ctx.fillStyle = 'white';
  ctx.fillText('Play Again', 150, canvas.height/2);
  ctx.fillText('Home', 450, canvas.height/2);
  ctx.rect(145,canvas.height/2-27,155, 40);
  ctx.rect(445,canvas.height/2-27,90, 40);
  ctx.strokeStyle = 'white';
  ctx.stroke();
}
