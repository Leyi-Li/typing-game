function blackHoleInitialize() { 
  for (var i = 0; i < 250; i++) { 
    particles.push(new Particle(canvas.width/2, canvas.height/2, randomIntBetween(1,3), randomColor()));
  }
  animateBlackHole();
}

function biggerBlackHoleInitialize() { 
  cancelAnimationFrame(blackHoleAnimation);
  eventHorizonRadius = 250;
  particles = [];
  for (var i = 0; i < 650; i++) { 
    particles.push(new BiggerParticle(canvas.width/2, canvas.height/2, randomIntBetween(1,3), randomColor()));
  }
  animateBlackHole();
}

function biggestBlackHoleInitialize() { 
  cancelAnimationFrame(blackHoleAnimation);
  eventHorizonRadius = 300;
  particles = [];
  for (var i = 0; i < 1050; i++) { 
    particles.push(new BiggestParticle(canvas.width/2, canvas.height/2, randomIntBetween(1,3), randomColor()));
  }
  animateBlackHole();
}

function Particle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.radians = Math.random() * Math.PI * 2;
  this.velocity = 0.08;
  this.pathRadius = randomIntBetween(10,60);
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

function BiggerParticle(x, y, radius, color) { 
  Particle.call(this, x, y, radius, color);
  this.velocity = 0.08;
  this.pathRadius = randomIntBetween(30,120);
}

BiggerParticle.prototype.render = function() {
  
  this.radians += this.velocity;

  this.x = x + Math.cos(this.radians) * this.pathRadius;
  this.y = y + Math.sin(this.radians) * this.pathRadius; 

  this.draw();
}

BiggerParticle.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.closePath();
}

function BiggestParticle(x, y, radius, color) { 
  Particle.call(this, x, y, radius, color);
  this.velocity = 0.08;
  this.pathRadius = randomIntBetween(50,180);
}

BiggestParticle.prototype.render = function() {
  
  this.radians += this.velocity;

  this.x = x + Math.cos(this.radians) * this.pathRadius;
  this.y = y + Math.sin(this.radians) * this.pathRadius; 

  this.draw();
}

BiggestParticle.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.closePath();
}

function animateBlackHole() { 
  blackHoleAnimation = requestAnimationFrame(animateBlackHole);
  particles.forEach(particle => { 
    particle.render();
  });
}