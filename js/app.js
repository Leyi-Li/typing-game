'use strict';
var paused = false;
var ctx = document.getElementById('game').getContext('2d');
var canvas = document.getElementById('game');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.font = '15px "Press Start 2P"';
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
  'prototype',
  'for(i=0;i<name.length;i++)',
  'ctx.stroke',
  'ctx.createlinearGradient',
  'console.log()',
  'Math.floor',
  '<figcaption></figcaption>',
  'BossQuangIsTheCoolestGuyInTown',
  'border-bottom-right-radius',
  'border-bottom-left-radius',
  'background-position-x',
  'background-position-y',
  'border-top-right-radius',
  'border-top-left-radius',
  'background-attachment:scroll',
  'background-attachment:fixed',
  'background-color:rgba(255,255,128,.5)',
  'border-image-width:30px',
  'box-shadow',
  'instanceName.constructor.name',
  'Boolean.prototype.constructor'];


var words10Fewer = words.filter(word => word.length < 10);
var wordsBetween10And20 = words.filter(word => word.length < 20 && word.length > 10);
var wordsAbove20 = words.filter(word => word.length > 20);
var wordsBossRound = words.filter(word => word.length > 30);

var x = window.innerWidth - 200;
var y = window.innerHeight/2;
var score = 0;
var eventHorizonRadius = 200;
var pathRadius = 200;
var radians = (3 * Math.PI)/4;
var randomIndex;
var letterIndex = 0;
var index = 0;
var wordX = 0;
var wordLength = 0;
var wordHeight = 5;
var padding = 5;
var particles = [];
var stars = [];
var spawnLocation = [];
var pastWords = [];
var explosionPieces = [];
var newWord;
var newWord2;
var newWord3;
var wordAnimation;
var word2Animation;
var word3Animation;
var blackHoleAnimation;
var explosionAnimation;
var shrinkingAnimation;
var showRoundAnimation;
var showStartingTextAnimation;
var lives = 3;
var level = 0;
var numRound = 0;
var wordRight = 0;

function wordInitialize() {
  cancelAnimationFrame(wordAnimation);
  spawnNewWord();
  animateWord();
  console.log(animateWord, '???');
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
  var word = checkDuplicate();
  var radius = (ctx.measureText(word).width/2) + padding;
  console.log(radius);
  var dx = speedIncrease();

  newWord = new Word(wordX, y, radius, randomColor(), dx, word, pathRadius, letterIndex);
}

function spawnNewWord2() {
  var y = spawnLocation[randomIntBetween(0,spawnLocation.length-1)];
  var word = checkDuplicate();
  var radius = (ctx.measureText(word).width/2) + padding;
  var dx = speedIncrease();

  newWord2 = new Word(wordX -50, y, radius, randomColor(), dx, word, pathRadius, letterIndex);
}

function spawnNewWord3() {
  var y = spawnLocation[randomIntBetween(0,spawnLocation.length-1)];
  var word = checkDuplicate();
  var radius = (ctx.measureText(word).width/2) + padding;
  var dx = speedIncrease();

  newWord3 = new Word(wordX -50, y, radius, randomColor(), dx, word, pathRadius, letterIndex);
}

function animateWord() {
  if (paused) return;
  wordAnimation = requestAnimationFrame(animateWord);
  newWord.render();
  // console.log(newWord);
  // console.log(newWord.x, 'X', newWord.y, 'y');
  if (distance(newWord.x, newWord.y, x, y) < eventHorizonRadius) {
    newWord.pathRadius = newWord.pathRadius - 1;
    newWord.radius -= 20;
  }
  if (distance(newWord.x, newWord.y, x, y) < 20) {
    lives--;
    drawBox();
    if(paused === false) wordInitialize();
    newWord.letterIndex = 0;
    checkBlackHole();
    checkLives();
  }
}

function animateWord2() {
  if (paused) return;
  word2Animation = requestAnimationFrame(animateWord2);
  newWord2.render();
  if (distance(newWord2.x, newWord2.y, x, y) < eventHorizonRadius) {
    newWord2.pathRadius = newWord2.pathRadius - 1;
  }
  if (distance(newWord2.x, newWord2.y, x, y) < 20) {
    lives--;
    drawBox();
    word2Initialize();
    newWord2.letterIndex = 0;
    checkBlackHole();
    checkLives();
  }
}

function animateWord3() {
  if (paused) return;
  word3Animation = requestAnimationFrame(animateWord3);
  newWord3.render();
  if (distance(newWord3.x, newWord3.y, x, y) < eventHorizonRadius) {
    newWord3.pathRadius = newWord3.pathRadius - 1;
  }
  if (distance(newWord3.x, newWord3.y, x, y) < 20) {
    lives--;
    drawBox();
    word3Initialize();
    newWord3.letterIndex = 0;
    checkBlackHole();
    checkLives();
  }
}

function animateExplosion() {
  explosionAnimation = requestAnimationFrame(animateExplosion);
  explosionPieces.forEach( (pieces, index) => {
    pieces.render();
    if (pieces.time === 0) {
      explosionPieces.splice(index, 1);
    }
  });
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

Word.prototype.explode = function() {
  // this.radius -= 10;
  for(var i = 0; i < 150; i++) {
    explosionPieces.push(new Explosion(this.x + this.radius, this.y, randomNumberBetween(1,2), randomColor()));
  }
  cancelAnimationFrame(explosionAnimation);
  animateExplosion();
};

function Explosion(x, y, radius, color) {
  Word.call(this, x, y, radius, color);
  this.dx = randomNumberBetween(-2,2);
  this.dy = randomNumberBetween(-2,2);
  this.time = 60;
  this.opacity = 1;
}

Explosion.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
  ctx.fillStyle = `rgba(${randomIntBetween(0,255)}, ${randomIntBetween(0,255)}, ${randomIntBetween(0,255)}, ${this.opacity})`;
  ctx.fill();
  ctx.closePath();
};

Explosion.prototype.render = function() {
  this.draw();
  this.x += this.dx;
  this.y += this.dy;
  this.time -= 1;
  this.opacity -= 1 /this.time;
};

function locationSpawning() {
  var locationAmount = Math.floor(canvas.height/10);
  for(var i = 2; i <= 9; i++) {
    spawnLocation.push(locationAmount * i);
  }
}

window.addEventListener('keydown', keyPress);

function keyPress(e) {
  var key = e.key;
  console.log(key, 'key press');
  if (key === 'Delete') {
    pauseGameKeyHandler();
    return;
  }
  var currentLetter = newWord.word.charAt(newWord.letterIndex);

  if (key === currentLetter) {
    newWord.letterIndex++;
  }
  if (newWord.letterIndex === newWord.word.length) {
    checkScore(newWord.word.length);
    wordRight++;
    checkLevel();
    if (wordRight === 5) {
      newWord.explode();
      if(paused === false) {wordInitialize();}
      word2Initialize();
      window.addEventListener('keydown', keyPress2);
    } else if (wordRight === 10 || wordRight === 11) {
      newWord.explode();
      if(paused === false) { wordInitialize();}
      word3Initialize();
      // window.addEventListener('keydown', keyPress3);
    } else {
      newWord.explode();
      if(paused === false) {wordInitialize();}
      wordReset();
    }
  }
}

function keyPress2(e) {
  var key = e.key;
  var currentLetter = newWord2.word.charAt(newWord2.letterIndex);
  if (key === currentLetter) {
    newWord2.letterIndex++;
  } 
  if (newWord2.letterIndex === newWord2.word.length) {
    checkScore(newWord2.word.length);
    wordRight++;
    newWord2.explode();
    checkLevel();
    word2Initialize();
    wordReset();
  }
}

function keyPress3(e) {
  var key = e.key;
  var currentLetter = newWord3.word.charAt(newWord3.letterIndex);
  if (key === currentLetter) {
    newWord3.letterIndex++;
  } 
  if (newWord3.letterIndex === newWord3.word.length) {
    checkScore(newWord3.word.length);
    wordRight++;
    newWord3.explode();
    checkLevel();
    word3Initialize();
    wordReset();
    bossRound();
  }
}

function speedIncrease() {
  if (level === 0) {
    return randomNumberBetween(1,1.5);
  } else if (level === 1) {
    return randomNumberBetween(2,2.5);
  } else if (level === 2) {
    return randomNumberBetween(3,3.5);
  } else if (level === 3) {
    return randomNumberBetween(1,1.5);
  } else if (level === 4) {
    return randomNumberBetween(2,2.5);
  } else if (level === 5) { 
    return randomNumberBetween(2.5,3);
  } else if (level === 6) { 
    return randomNumberBetween(1,1.5);
  } else if (level === 7) {
    return randomNumberBetween(1.5,2);
  } else if (level === 8) {
    return randomNumberBetween(2,2.5);
  } else if (level === 9) {
    return randomNumberBetween(1.5,2);
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
  if (level <= 2) { 
    while(duplicate) {
      randomIndex = randomIntBetween(0, words10Fewer.length-1);
      word = words10Fewer[randomIndex];
      if (pastWords.includes(word) === false) {
        pastWords.push(word);
        duplicate = false;
      }
    }
    return word;
  } else if (level > 2 && level <= 5) {
    while(duplicate) {
      randomIndex = randomIntBetween(0, wordsBetween10And20.length-1);
      word = wordsBetween10And20[randomIndex];
      if (pastWords.includes(word) === false) {
        pastWords.push(word);
        duplicate = false;
      }
    }
    return word;
  } else if (level > 5) {
    while(duplicate) {
      randomIndex = randomIntBetween(0, wordsAbove20.length-1);
      word = wordsAbove20[randomIndex];
      if (pastWords.includes(word) === false) {
        pastWords.push(word);
        duplicate = false;
      }
    }

    return word; 
  } else if (wordRight > 50) { 
    while(duplicate) {
      randomIndex = randomIntBetween(0, wordsBossRound.length-1);
      word = wordsBossRound[randomIndex];
      if (pastWords.includes(word) === false) {
        pastWords.push(word);
        duplicate = false;
      }
    }
    return word; 
  }
}

function checkScore(wordLength) { 
  if (wordLength < 10) { 
    score++;
  } else if (wordLength >= 10 && wordLength < 20) { 
    score += 2;
  } else if (wordLength >= 20) { 
    score += 3;
  }
}

function checkLevel() { 
  if (wordRight === 5) {  
    level = 1;
  } if (wordRight=== 10) { 
    level = 2;
  } if (wordRight === 15) { 
    level = 3;
  } if (wordRight === 20) { 
    level = 4;
  } if (wordRight === 25) { 
    level = 5;
  } if (wordRight === 30) { 
    level = 6; 
  } if (wordRight === 35) { 
    level = 7;
  } if (wordRight === 40) { 
    level = 8;
  } if (wordRight === 50) { 
    level = 9;
  }
}

function checkLives() { 
  if (lives === 0) { 
    endPage();
    addScore();
  }
}

function endPage() { 
  removeWords();

  requestAnimationFrame(endPage);
  ctx.font = '30px "Press Start 2P"';
  ctx.fillStyle = 'white';
  ctx.fillText('Final Score', 150, canvas.height/2 - 200);
  ctx.fillText('Total Words Correct', 490, canvas.height/2 - 200);
  ctx.fillStyle = 'aqua';
  ctx.fillText(`${score}`, 150, canvas.height/2 - 150);
  ctx.fillText(`${wordRight}`, 490, canvas.height/2 - 150);
  homePageLink();
}


function removeWords() { 
  cancelAnimationFrame(wordAnimation);
  cancelAnimationFrame(word2Animation);
  cancelAnimationFrame(word3Animation);
  removeEventListener('keydown', keyPress);
  removeEventListener('keydown', keyPress2);
  removeEventListener('keydown', keyPress3);
}

function showStartingText() { 
  showStartingTextAnimation = requestAnimationFrame(showStartingText);
  ctx.font = 'bold 40px "Press Start 2P"';
  ctx.fillStyle = 'white';
  var words = 'STOP BLACK HOLE FROM GROWING';
  var wordsLength = ctx.measureText(words).width/2;
  ctx.fillText(words, canvas.width/2 - wordsLength, canvas.height/2 - 200);
  ctx.font = '15px "Press Start 2P"';
}

locationSpawning();
starInitialize();
blackHoleInitialize();
showStartingText();
window.setTimeout(function() {cancelAnimationFrame(showStartingTextAnimation);}, 5000);
window.setTimeout(function() {wordInitialize();}, 5000);
if(paused === false) wordInitialize();
drawScore();

window.setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}, 10);

window.setInterval(() => {
    
  if(newWord.x > canvas.width && distance(newWord.x, newWord.y, x, y) > eventHorizonRadius) {
    wordInitialize();
    if(paused === false) wordInitialize();
    score -= 2;
  } else if (newWord2.x > canvas.width && distance(newWord2.x, newWord2.y, x, y) > eventHorizonRadius) {
    word2Initialize();
    score -= 2;
  } else if (newWord3.x > canvas.width && distance(newWord3.x, newWord3.y, x, y) > eventHorizonRadius) {
    word3Initialize();
    score -= 2;
  }
}, 100);

function pauseGameKeyHandler() {
  console.log('insidepauseGamKeyHandler');
  if (paused === false) {
    console.log('icalledpause');
    pause();
  } else if (paused === true) {
    console.log('icalledresume');
    resume();
  }
}

function pause() {
  paused = true;
  console.log('inside Pause');
  localStorage.setItem('word1',JSON.stringify(newWord));
  localStorage.setItem('word2',JSON.stringify(newWord2));
  localStorage.setItem('word3',JSON.stringify(newWord3));
  localStorage.setItem('score',JSON.stringify(score));
  localStorage.setItem('lives',JSON.stringify(lives));
  newWord={};
  newWord2={};
  newWord3={};
}

function resume() {
  paused = false;
  console.log('inside resume');
  var lsgWord1 = localStorage.getItem('word1');
  var lsgWord2 = localStorage.getItem('word2');
  var lsgWord3 = localStorage.getItem('word3');
  console.log(lsgWord1, 'wooo');
  if (lsgWord1) {
    var thisWord = JSON.parse(lsgWord1);
    newWord = new Word(thisWord.x, thisWord.y, thisWord.radius, randomColor(), thisWord.dx, thisWord.word, thisWord.pathRadius, thisWord.letterIndex);
    animateWord();
  }
  else if(lsgWord2) {
    var thisWord2 = JSON.parse(lsgWord2);
    newWord = new Word(thisWord2.x, thisWord2.y, thisWord2.radius, randomColor(), thisWord2.dx, thisWord2.word, thisWord2.pathRadius, thisWord2.letterIndex);
    animateWord2();
  }
  else if(lsgWord3) {
    var thisWord3 = JSON.parse(lsgWord3);
    newWord = new Word(thisWord3.x, thisWord3.y, thisWord3.radius, randomColor(), thisWord3.dx, thisWord3.word, thisWord3.pathRadius, thisWord3.letterIndex);
    animateWord3();
  }
}
