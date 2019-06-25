'use strict';

var ctx = document.getElementById('game').getContext('2d');
var canvas = document.getElementById('game');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.font = '15px Helvetica';
var words = [
  '<!DOCTYPE>',
  '<a>',
  '<abbr>',
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
  '<video>',
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
  'position:relative',
  'position:fixed',
  'position:absolute',
  'text-align',
  'text-decoration',
  'text-indent',
  'text-shadow',
  'text-transform',
  'text-overflow',
  'width',
  'constructor',
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
  'element.setAttribute',
  'function',
  'object',
  'prototype'];

  var words10Fewer = words.filter(word => word.length < 10);
  var wordsBetween10And20 = words.filter(word => word.length < 20 && word.length > 10);
  var wordsAbove20 = words.filter(word => word.length > 20);

var x = window.innerWidth - 200;
var y = window.innerHeight/2;
var score = 0;
var eventHorizonRadius = 200;
var pathRadius = 200;
var radians = (3 * Math.PI)/4;
var randomIndex;
var letterIndex = 0;
// var letterIndex2 = 0;
// var letterIndex3 = 0;
var wordX = 0;
var wordLength = 0;
var wordHeight = 5;
var padding = 5;
var particles = [];
var stars = [];
var spawnLocation = [];
var wordsList = [];
var pastWords = [];
var newWord;
var newWord2;
var newWord3;
var wordAnimation;
var word2Animation;
var word3Animation;
var blackHoleAnimation;
var lives = 3;
var level = 0;

function wordInitialize() {
  cancelAnimationFrame(wordAnimation);
  spawnNewWord();
  animateWord();
}

function word2Initialize() {
  cancelAnimationFrame(word2Animation);
  spawnNewWord2();
  animateWord2();
}

function word3Initialize() {
  cancelAnimationFrame(word3Animation);
  spawnNewWord3();
  animateWord3();
}

function spawnNewWord() {
  var y = spawnLocation[randomIntBetween(0,spawnLocation.length-1)];
  var radius = (ctx.measureText(words[randomIndex]).width)/2 + padding;
  var dx = speedIncrease();
  var word = checkDuplicate();
  newWord = new Word(wordX, y, radius, randomColor(), dx, word, pathRadius, letterIndex);
}

function spawnNewWord2() {
  var y = spawnLocation[randomIntBetween(0,spawnLocation.length-1)];
  var radius = (ctx.measureText(words[randomIndex]).width)/2 + padding;
  var dx = speedIncrease();
  var word = checkDuplicate();
  newWord2 = new Word(wordX -50, y, radius, randomColor(), dx, word, pathRadius, letterIndex);
}

function spawnNewWord3() {
  var y = spawnLocation[randomIntBetween(0,spawnLocation.length-1)];
  var radius = (ctx.measureText(words[randomIndex]).width)/2 + padding;
  var dx = speedIncrease();
  var word = checkDuplicate();
  newWord3 = new Word(wordX -50, y, radius, randomColor(), dx, word, pathRadius, letterIndex);
}

function animateWord() {
  wordAnimation = requestAnimationFrame(animateWord);
  newWord.render();
  if (distance(newWord.x, newWord.y, x, y) < eventHorizonRadius) {
    newWord.pathRadius = newWord.pathRadius - 1;
  }
  if (distance(newWord.x, newWord.y, x, y) < 20) {
    lives--;
    wordInitialize();
    newWord.letterIndex = 0;
    checkBlackHole();
    if (lives === 0) {
      alert('game over');
    }
  }
}

function animateWord2() {
  word2Animation = requestAnimationFrame(animateWord2);
  newWord2.render();
  if (distance(newWord2.x, newWord2.y, x, y) < eventHorizonRadius) {
    newWord2.pathRadius = newWord2.pathRadius - 1;
  }
  if (distance(newWord2.x, newWord2.y, x, y) < 20) {
    lives--;
    word2Initialize();
    newWord2.letterIndex = 0;
    checkBlackHole();
    if (lives === 0) {
      alert('game over');
    }
  }
}

function animateWord3() {
  word3Animation = requestAnimationFrame(animateWord3);
  newWord3.render();
  if (distance(newWord3.x, newWord3.y, x, y) < eventHorizonRadius) {
    newWord3.pathRadius = newWord3.pathRadius - 1;
  }
  if (distance(newWord3.x, newWord3.y, x, y) < 20) {
    lives--;
    word3Initialize();
    newWord3.letterIndex = 0;
    checkBlackHole();
    if (lives === 0) {
      alert('game over');
    }
  }
}

function Word(x, y, radius, color, dx, word, pathRadius, letterIndex) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.dx = dx;
  this.word = word;
  this.pathRadius = pathRadius;
  this.letterIndex = letterIndex;
}

Word.prototype.draw = function() {
  ctx.fillStyle = 'white';
  ctx.fillText(this.word, this.x, this.y);
  wordLength = ctx.measureText(this.word).width;
  ctx.beginPath();
  ctx.arc(this.x + wordLength/2, this.y - wordHeight, wordLength/2 + padding, 0, 2*Math.PI, false);
  ctx.lineWidth = 2;
  ctx.strokeStyle = this.color;
  ctx.stroke();
};

Word.prototype.render = function() {
  if (distance(this.x, this.y, x, y) < eventHorizonRadius) {
    radians += 0.05;
    this.x = x + Math.cos(radians) * this.pathRadius;
    this.y = y + Math.sin(radians) * this.pathRadius;
  } else {
    this.x += this.dx;
  }
  this.draw();
  if (this.letterIndex > 0) {
    ctx.fillStyle = 'red';
    ctx.fillText(this.word.slice(0, this.letterIndex), this.x, this.y);
  }
};

function locationSpawning() {
  var locationAmount = Math.floor(canvas.height/10);
  for(var i = 2; i <= 9; i++) {
    spawnLocation.push(locationAmount * i);
  }
}

function keyPress2(e) {
  var key = e.key;
  var currentLetter = newWord2.word.charAt(newWord2.letterIndex);
  if (key === currentLetter) {
    newWord2.letterIndex++;
  } else if(newWord2.letterIndex === newWord2.word.length) {
    score++;
    word2Initialize();
    wordReset();
  }
}

function keyPress3(e) {
  var key = e.key;
  var currentLetter = newWord3.word.charAt(newWord3.letterIndex);
  if (key === currentLetter) {
    newWord3.letterIndex++;
  } else if(newWord3.letterIndex === newWord3.word.length) {
    score++;
    word3Initialize();
    wordReset();
  }
}

function speedIncrease() { 
  if (level === 0) { 
    return randomNumberBetween(1,1.5);
  } else if (level === 1) { 
    return randomNumberBetween(2,2.5);
  } else if (level === 2) { 
    return randomNumberBetween(2.5,3);
  } else if (level === 3) { 
    return randomNumberBetween(3,3.5);
  } else if (level === 4) { 
    return randomNumberBetween(3.5,4);
  }
}

function wordReset() {
  newWord.letterIndex = 0;
  newWord2.letterIndex = 0;
  newWord3.letterIndex = 0;
  pathRadius = eventHorizonRadius;
}

function checkBlackHole() {
  if (lives === 2) {
    biggerBlackHoleInitialize();
  } else if (lives === 1) {
    biggestBlackHoleInitialize();
  }
}

function checkDuplicate() {
  var randomIndex;
  var word;
  var duplicate = true;
  // if (level = )
  while(duplicate) {
    randomIndex = randomIntBetween(0, words.length-1);
    word = words[randomIndex];
    if (pastWords.includes(word) === false) {
      pastWords.push(word);
      duplicate = false;
    }
  }
  return word;
}

locationSpawning();
starInitialize();
blackHoleInitialize();
wordInitialize();
drawScore();

window.setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}, 10);

window.setInterval(() => {
  if(newWord.x > canvas.width) {
    wordInitialize();
  } else if (newWord2.x > canvas.width) {
    word2Initialize();
  } else if (newWord3.x > canvas.width) {
    word3Initialize();
  }
  if (score > 5) { 
    level = 1;
  } else if (score > 10) { 
    level = 2;
  } else if (score > 15) { 
    level = 3;
  } else if (score > 20) { 
    level = 4;
  }
}, 100);

window.addEventListener('keydown', keyPress);
function keyPress(e) {
  var key = e.key;
  var currentLetter = newWord.word.charAt(newWord.letterIndex);
  if (key === currentLetter) {
    newWord.letterIndex++;
  } else if(newWord.letterIndex === newWord.word.length) {
    score++;
    console.log(score);
    if (score === 5) {
      wordInitialize();
      word2Initialize();
      window.addEventListener('keydown', keyPress2);
    } else if (score === 10 || score === 11) {
      wordInitialize();
      word3Initialize();
      window.addEventListener('keydown', keyPress3);
    } else {
      wordInitialize();
      wordReset();
    }
  }
}



