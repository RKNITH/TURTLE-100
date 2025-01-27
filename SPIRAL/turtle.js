export class Turtle {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.angle = 0;
    this.penDown = true;
    this.color = '#00ff00';
    this.lineWidth = 2;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;
    this.angle = 0;
  }

  forward(distance) {
    const newX = this.x + distance * Math.cos(this.angle * Math.PI / 180);
    const newY = this.y + distance * Math.sin(this.angle * Math.PI / 180);
    
    if (this.penDown) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(newX, newY);
      this.ctx.stroke();
    }
    
    this.x = newX;
    this.y = newY;
  }

  right(angle) {
    this.angle = (this.angle + angle) % 360;
  }

  left(angle) {
    this.angle = (this.angle - angle + 360) % 360;
  }

  penup() {
    this.penDown = false;
  }

  pendown() {
    this.penDown = true;
  }

  setColor(color) {
    this.color = color;
  }
}