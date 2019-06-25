function blackHoleInitialize() { 
  for (var i = 0; i < 250; i++) { 
    particles.push(new Particle(canvas.width/2, canvas.height/2, randomIntBetween(1,3), randomColor()));
  }
}

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
  // ctx.fillStyle = 'rgba(0,0,0,0.05)';
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => { 
    particle.render();
  });
}