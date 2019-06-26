'use strict';

function starInitialize() { 
  for (var i = 0; i < 200; i++) {
    stars.push(new Star(randomIntBetween(0, canvas.width), randomIntBetween(0, canvas.height), randomIntBetween(1,2), randomColor(), randomNumberBetween(0.3,0.5)));
  }
  animateStar();
}

function Star(x, y, radius, color, dx) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.dx = dx;
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
  this.draw();
}

function animateStar() { 
  requestAnimationFrame(animateStar);

  stars.forEach(star => { 
    star.render();
  });
}