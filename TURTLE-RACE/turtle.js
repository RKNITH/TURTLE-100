export class Turtle {
  constructor(x, y, color, name) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.name = name;
    this.speed = 0;
    this.element = this.createTurtle();
  }

  createTurtle() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svg.setAttribute("fill", this.color);
    this.updatePosition(svg);
    return svg;
  }

  updatePosition(element = this.element) {
    if (!element) return;
    
    // Turtle shape path
    const path = `
      M ${this.x},${this.y}
      l 0,-10
      c 10,0 20,10 20,20
      c 0,10 -10,20 -20,20
      c -10,0 -20,-10 -20,-20
      c 0,-10 10,-20 20,-20
      z
    `;
    element.setAttribute("d", path);
  }

  move() {
    this.x += this.speed;
    this.updatePosition();
    return this.x;
  }

  setRandomSpeed() {
    this.speed = Math.random() * 2 + 1;
  }

  reset(startX) {
    this.x = startX;
    this.speed = 0;
    this.updatePosition();
  }
}