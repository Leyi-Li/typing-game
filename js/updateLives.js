'use strict';

function drawBox(){
  var imgId = ['life1', 'life2', 'life3'];
  var location;
  if(lives === 2){
    location = document.getElementById(imgId[1]);
    location.src='../img/Picture1.png';
  }else if(lives === 1){
    location = document.getElementById(imgId[2]);
    location.src='../img/Picture1.png';
  }else if(lives ===0){
    location = document.getElementById(imgId[0]);
    location.src='../img/Picture1.png';
  }
}
