export class Turtle {
  constructor(svg) {
    this.svg = svg;
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.penDown = true;
    this.path = '';
    this.lineWidth = 2;
    this.color = '#000';
  }

  reset() {
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.path = '';
    this.moveTo(0, 0);
  }

  createPath() {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', this.path);
    path.setAttribute('stroke', this.color);
    path.setAttribute('stroke-width', this.lineWidth);
    path.setAttribute('fill', 'none');
    return path;
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
    this.path += `M ${x} ${y} `;
  }

  forward(distance) {
    const radians = (this.angle * Math.PI) / 180;
    const newX = this.x + distance * Math.cos(radians);
    const newY = this.y + distance * Math.sin(radians);
    
    if (this.penDown) {
      this.path += `L ${newX} ${newY} `;
    } else {
      this.path += `M ${newX} ${newY} `;
    }
    
    this.x = newX;
    this.y = newY;
  }

  right(angle) {
    this.angle = (this.angle + angle) % 360;
  }

  left(angle) {
    this.angle = (this.angle - angle) % 360;
  }

  penup() {
    this.penDown = false;
  }

  pendown() {
    this.penDown = true;
  }

  setPosition(x, y) {
    this.moveTo(x, y);
  }

  setAngle(angle) {
    this.angle = angle % 360;
  }

  setLineWidth(width) {
    this.lineWidth = width;
  }

  setColor(color) {
    this.color = color;
  }
}