import { Turtle } from './turtle.js';

class MandalaGenerator {
  constructor() {
    this.setupCanvas();
    this.bindEvents();
    this.generate();
  }

  setupCanvas() {
    this.container = document.getElementById('canvas');
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('viewBox', '-250 -250 500 500');
    this.container.appendChild(this.svg);
    this.turtle = new Turtle(this.svg);
  }

  bindEvents() {
    document.getElementById('generate').addEventListener('click', () => this.generate());
    document.getElementById('download').addEventListener('click', () => this.downloadSVG());
    
    ['petals', 'size', 'lineWidth'].forEach(id => {
      document.getElementById(id).addEventListener('input', () => this.generate());
    });
  }

  drawPetal(size) {
    this.turtle.forward(size);
    this.turtle.right(45);
    this.turtle.forward(size / 2);
    this.turtle.right(135);
    this.turtle.forward(size / 2);
    this.turtle.right(45);
    this.turtle.forward(size);
  }

  generate() {
    // Clear previous mandala
    while (this.svg.firstChild) {
      this.svg.removeChild(this.svg.firstChild);
    }

    const numPetals = parseInt(document.getElementById('petals').value);
    const size = parseInt(document.getElementById('size').value);
    const lineWidth = parseInt(document.getElementById('lineWidth').value);

    // Set up turtle
    this.turtle.reset();
    this.turtle.setLineWidth(lineWidth);
    
    // Generate color palette
    const hue = Math.random() * 360;
    const colors = Array.from({length: 3}, (_, i) => 
      `hsl(${(hue + i * 120) % 360}, 70%, 50%)`
    );

    // Draw layers
    for (let layer = 0; layer < 3; layer++) {
      this.turtle.reset();
      this.turtle.setColor(colors[layer]);
      
      const angleStep = 360 / numPetals;
      const layerSize = size * (1 - layer * 0.2);

      for (let i = 0; i < numPetals; i++) {
        this.drawPetal(layerSize);
        this.turtle.right(angleStep);
      }

      this.svg.appendChild(this.turtle.createPath());
    }
  }

  downloadSVG() {
    const svgData = this.svg.outerHTML;
    const blob = new Blob([svgData], {type: 'image/svg+xml'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mandala.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

new MandalaGenerator();