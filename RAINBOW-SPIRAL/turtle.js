export class Turtle {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.angle = 0;
    this.penDown = true;
    this.color = '#000000';
  }

  reset() {
    this.x = this.ctx.canvas.width / 2;
    this.y = this.ctx.canvas.height / 2;
    this.angle = 0;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  forward(distance) {
    const newX = this.x + distance * Math.cos(this.angle * Math.PI / 180);
    const newY = this.y + distance * Math.sin(this.angle * Math.PI / 180);
    
    if (this.penDown) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = 2;
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(newX, newY);
      this.ctx.stroke();
    }
    
    this.x = newX;
    this.y = newY;
  }

  right(angle) {
    this.angle += angle;
  }

  left(angle) {
    this.angle -= angle;
  }

  setColor(color) {
    this.color = color;
  }
}