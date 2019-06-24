'use strict';

var ctx = document.getElementById('game').getContext('2d');
var canvas = document.getElementById('game');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.font = '20px sans-serif';
var words = ['ain', 'hello', 'sup', 'whaddup', 'hey', 'bye', 'goodbye', 'buh-bye'];
var degrees = [0,15,30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345,360];
var wordIndex = 0;
var letterIndex = 0;
var wordX = -50;
var x = window.innerWidth - 200;
var y = window.innerHeight/2;
var dz = 2;
var wordLength = 0;
var wordHeight = 5;
var padding = 5;
var particles = [];
var stars = [];
var spawnLocation = [];
Word.list = [];

function blackHoleInitialize() { 
  for (var i = 0; i < 50; i++) { 
    particles.push(new Particle(canvas.width/2, canvas.height/2, randomIntBetween(1,3), randomColor()));
  }
}

function starInitialize() { 
  for (var i = 0; i < 200; i++) {
    stars.push(new Star(randomIntBetween(0, canvas.width), randomIntBetween(0, canvas.height), randomIntBetween(1,2), randomColor(), randomNumberBetween(0.01,0.03)));
  }
}

function wordInitialize() { 
  locationSpawning();
  var randomLocation = spawnLocation[randomIntBetween(0,spawnLocation.length-1)];
  var randomWord = words[randomIntBetween(0,words.length-1)];
  var randomWordLength = ctx.measureText(randomWord).width;
  new Word(wordX, randomLocation, randomWordLength/2 + padding, randomColor(), randomIntBetween(0.01, 0.03));
}

function Word(x, y, radius, color, dx, word) { 
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.dx = dx;
  this.word = word;
  this.list.push();
}

Word.prototype.draw = function() { 
  ctx.fillStyle = 'white';
  ctx.fillText(words[wordIndex], x, y);
  wordLength = ctx.measureText(words[wordIndex]).width;
  ctx.beginPath();
  ctx.arc(x + wordLength/2, y - wordHeight, wordLength/2 + padding, 0, 2*Math.PI, false);
  ctx.strokeStyle = 'red';
  ctx.stroke();
}

function Star(x, y, radius, color, dx) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.dx = dx;
  // this.dy = dy;
}

Star.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.closePath();
}

Star.prototype.render = function() {

  this.x += this.dx;

  if (this.x > canvas.width) { 
    this.x = 0;
  }
  // this.y += this.dy;

  this.draw();
}
// Word.list = [];
// function Word(x, y, radius, color, word) { 
//   this.x = x;
//   this.y = y;
//   this.radius = radius; 
//   this.color = color;
//   this.word = word;
//   this.list.push();
//   // this.dx = 
//   // this.dy = 
// }

function Particle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.radians = Math.random() * Math.PI * 2;
  this.velocity = 0.08;
  this.pathRadius = randomIntBetween(10, 60);
}

Particle.prototype.render = function() {
  this.radians += this.velocity;

  this.x = x + Math.cos(this.radians) * this.pathRadius;
  this.y = y + Math.sin(this.radians) * this.pathRadius; 

  this.draw();
}

Particle.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.closePath();
}

function animateBlackHole() { 
  requestAnimationFrame(animateBlackHole);
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => { 
    particle.render();
  });
}

function animateStar() { 
  requestAnimationFrame(animateStar);

  stars.forEach(star => { 
    star.render();
  });
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // particles.forEach(particle => { 
  //   particle.render();
  // });
}

function locationSpawning() { 
  var locationAmount = Math.floor(canvas.height/10);
  for(var i = 1; i <= locationAmount; i++) { 
    spawnLocation.push(locationAmount * i);
  }
}

starInitialize();
animateStar();
blackHoleInitialize();
animateBlackHole();


// window.addEventListener('keydown', keyPress);
// function keyPress(e) { 
//   var key = e.key;
//   var currentLetter = words[wordIndex].charAt(letterIndex);
//   if (key === currentLetter) { 
//     if (letterIndex === 0) { 
//       ctx.fillStyle = 'red';
//       ctx.fillText(words[wordIndex].charAt(letterIndex), x, y);
//       letterIndex++;
//     } else if(letterIndex > 0) { 
//       ctx.fillStyle = 'red';
//       ctx.fillText(words[wordIndex].slice(0, letterIndex), x, y);
//       letterIndex++;
//     }
//     if (letterIndex === words[wordIndex].length) { 
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       wordIndex++;
//       letterIndex = 0;
//       resetPosition();
//       ctx.fillStyle = 'white';
//       ctx.fillText(words[wordIndex], x, y);
//     }
//   }
// }


// var change = calcDxDy();
// var dx = change[0];
// var dy = change[1];

// window.setInterval(() => {
//   x += dx;
//   y += dy;
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.fillStyle = 'white';
//   ctx.fillText(words[wordIndex], x, y);
//   wordLength = ctx.measureText(words[wordIndex]).width;
//   ctx.beginPath();
//   ctx.arc(x + wordLength/2, y - wordHeight, wordLength/2 + padding, 0, 2*Math.PI, false);
//   ctx.strokeStyle = 'red';
//   ctx.stroke();
//   if (letterIndex > 0) { 
//     ctx.fillStyle = 'red';
//     ctx.fillText(words[wordIndex].slice(0, letterIndex), x, y);
//   }
//   if (x < 0 || x + wordLength + padding * 2 > window.innerWidth) { 
//     dx = -dx;
//   }
//   if (y - wordLength/2 < 0 || y + wordLength/2 > window.innerHeight) { 
//     dy = -dy;
//   }
// }, 10);

// function calcDxDy() { 
//   var randomDirection = randomDegree();
//   dx = Math.cos(randomDirection) * dz;
//   dy = Math.sin(randomDirection) * dz;
//   return [dx,dy];
// }

// function randomDegree() { 
//   var randomIndex = Math.floor(Math.random() * degrees.length);
//   return degrees[randomIndex];
// }

// function resetPosition() { 
//   x = window.innerWidth/2;
//   y = window.innerHeight/2;
//   change = calcDxDy();
//   dx = change[0];
//   dy = change[1];
// }


