export class Turtle {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.penDown = true;
    this.color = '#000000';
  }

  // Move to position without drawing
  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }

  // Set angle in degrees
  setAngle(angle) {
    this.angle = (angle * Math.PI) / 180;
  }

  // Move forward by distance
  forward(distance) {
    const newX = this.x + Math.cos(this.angle) * distance;
    const newY = this.y + Math.sin(this.angle) * distance;
    
    if (this.penDown) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.color;
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(newX, newY);
      this.ctx.stroke();
    }
    
    this.x = newX;
    this.y = newY;
  }

  // Turn right by angle degrees
  right(angle) {
    this.angle += (angle * Math.PI) / 180;
  }

  // Turn left by angle degrees
  left(angle) {
    this.angle -= (angle * Math.PI) / 180;
  }

  // Set pen color
  setColor(color) {
    this.color = color;
  }

  // Draw shapes
  drawSquare(size) {
    for (let i = 0; i < 4; i++) {
      this.forward(size);
      this.right(90);
    }
  }

  drawTriangle(size) {
    for (let i = 0; i < 3; i++) {
      this.forward(size);
      this.right(120);
    }
  }

  drawCircle(radius) {
    const steps = 360;
    const stepAngle = 360 / steps;
    for (let i = 0; i < steps; i++) {
      this.forward(2 * Math.PI * radius / steps);
      this.right(stepAngle);
    }
  }

  drawStar(size) {
    for (let i = 0; i < 5; i++) {
      this.forward(size);
      this.right(144);
    }
  }
}