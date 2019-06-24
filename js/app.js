'use strict';

var ctx = document.getElementById('game').getContext('2d');
var canvas = document.getElementById('game');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.font = '20px sans-serif';
var degrees = [0,15,30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345,360];
var wordsHTML = ['<!DOCTYPE>', '<a>', '<abbr>', 
    '<acronym>',
    '<address>',
    '<article>',
    '<aside>',
    '<audio>',
    '<b>',
    '<base>',
    '<body>',
    '<br>',
    '<button>',
    '<canvas>',
    '<caption>',
    '<cite>',
    '<div>',
    '<dl>',
    '<dt>',
    '<em>',
    '<fieldset>',
    '<figcaption>',
    '<figure>',
    '<footer>',
    '<form>',
    '<h1>',
    '<h2>',
    '<h3>',
    '<head>',
    '<header>',
    '<hr>',
    '<html>',
    '<i>',
    '<img>',
    '<input>',
    '<label>',
    '<legend>',
    '<li>',
    '<link>',
    '<main>',
    '<map>',
    '<meta>',
    '<nav>',
    '<object>',
    '<option>',
    '<p>',
    '<script>',
    '<section>',
    '<select>',
    '<source>',
    '<span>',
    '<strong>',
    '<table>',
    '<tbody>',
    '<td>',
    '<tfoot>',
    '<thead>',
    '<title>',
    '<ul>',
    '<video>']          


var wordsCSS = [
    'a:link',
    'a:visited',
    'a:hover',
    'a:active',
    'align',
    'background-color',
    'background-image',
    'background-repeat',
    'background-position',
    'border-color',
    'border-collapse',
    'border-radius',
    'border-style',
    'border-spacing',
    'border-width',
    'color',
    'display',
    'float',
    'font',
    'font-family',
    'font-size',
    'font-style',
    'font-weight',
    'height',
    'inline-block',
    'letter-spacing',
    'line-height',
    'list-style',
    'list-style-image',
    'list-style-position',
    'list-style-type',
    'margin',
    'margin-bottom',
    'margin-left',
    'margin-right',
    'margin-top',
    'overflow:visible',
    'overflow:hidden',
    'overflow:scroll',
    'overflow:auto',
    'opacity',
    'padding',
    'padding-bottom',
    'padding-left',
    'padding-right',
    'padding-top',
    'position',
    'position:static',
    'positon:relative',
    'position:fixed',
    'position:absolute',
    'text-align',
    'text-decoration',
    'text-indent',
    'text-shadow',
    'text-transform',
    'text-overflow',
    'width']

var wordsJS = [
    'document.getElementById();',
    'document.getElementsById();',
    'document.getElementsByTagName();',
    'document.getElementsByClassName();',
    'document.createElement();',
    'document.removeChild();',
    'document.appendChild();',
    'document.replaceChild();',
    'element.innerHTML',
    'element.attribute',
    'element.setAttribute'];

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

function wordInitialize() { 
  locationSpawning();
  var randomLocation = spawnLocation[randomIntBetween(0,spawnLocation.length-1)];
  var randomWord = wordsHTML[randomIntBetween(0,wordsHTML.length-1)];
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
  Word.list.push(this);
}

Word.prototype.draw = function() { 
  ctx.fillStyle = 'white';
  ctx.fillText(this.word, this.x, this.y);
  wordLength = ctx.measureText(this.word).width;
  ctx.beginPath();
  ctx.arc(x + wordLength/2, y - wordHeight, wordLength/2 + padding, 0, 2*Math.PI, false);
}

Word.prototype.render = function() { 
  this.draw();
}



function animateWord() {
  requestAnimationFrame(animateWord);
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

// wordInitialize();
// animateWord();
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


