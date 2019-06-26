'use strict';

// var myAudio = document.getElementById('player');
// // var isPlaying = false;

// function togglePlay(){
//   if (myAudio.onplaying){
//     myAudio.pause();
//   }else if(myAudio.onPause){
//     myAudio.play();
//   }
// }

// myAudio.onplaying = function(){
//   isPlaying = true;
// };

// myAudio.onPause = function(){
//   isPlaying = false;
// };

var player = document.getElementById('player');
function musicPlay(){
    player.play();
}
function musicPause(){
    player.pause();
}


