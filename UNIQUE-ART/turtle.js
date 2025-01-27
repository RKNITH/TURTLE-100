export class Turtle {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.reset();
  }

  reset() {
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 50;
    this.angle = -90;
    this.penDown = true;
    this.stack = [];
    this.ctx.strokeStyle = '#4CAF50';
    this.ctx.lineWidth = 2;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.reset();
  }

  // Move forward by specified distance
  forward(distance) {
    const newX = this.x + distance * Math.cos(this.angle * Math.PI / 180);
    const newY = this.y + distance * Math.sin(this.angle * Math.PI / 180);
    
    if (this.penDown) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(newX, newY);
      this.ctx.stroke();
    }
    
    this.x = newX;
    this.y = newY;
  }

  // Turn right by specified angle
  right(angle) {
    this.angle += angle;
  }

  // Turn left by specified angle
  left(angle) {
    this.angle -= angle;
  }

  // Save current position and angle
  push() {
    this.stack.push({
      x: this.x,
      y: this.y,
      angle: this.angle
    });
  }

  // Restore last saved position and angle
  pop() {
    if (this.stack.length > 0) {
      const state = this.stack.pop();
      this.x = state.x;
      this.y = state.y;
      this.angle = state.angle;
    }
  }
}