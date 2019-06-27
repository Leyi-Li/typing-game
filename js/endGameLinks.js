var playText = 'Play Again';
var homeText = 'Home';
var isLink1 = false;
var isLink2 = false;


function homePageLink() {  
  ctx.rect(145,canvas.height/2-27,155, 40);
  ctx.rect(445,canvas.height/2-27,90, 40);
  ctx.strokeStyle = 'white';
  ctx.stroke();
  ctx.font = '30px sans-serif';
  ctx.fillStyle = 'white';
  ctx.fillText('Play Again', 150, canvas.height/2);
  ctx.fillText('Home', 450, canvas.height/2);

  canvas.addEventListener('mousemove', CanvasMouseMove);
  canvas.addEventListener('click',linkClick);
}

function CanvasMouseMove(e){
  var homeWidth = ctx.measureText(homeText).width;
  var playWidth = ctx.measureText(playText).width; 
  var homeY = canvas.height/2;
  var playAgainY = canvas.height/2;
  var x = e.clientX;
  var y = e.clientY;

  if(x >= 450 && x <=550 && y <= (homeY+60) && y >=(homeY+20)){
    document.body.style.cursor = 'pointer';
    isLink1 = true;
  }else if(x >= 150 && x <=290 && y <= (homeY+60) && y >=(homeY+20)){
    document.body.style.cursor = 'pointer';
    isLink2 = true;
  }else{
    document.body.style.cursor = '';
    isLink1 = false;
    isLink2 = false;
  }
}

function linkClick(e){
  if(isLink1){
    document.location.href = 'index.html';
  }else if(isLink2){
    document.location.href = 'game.html';
  }
}


