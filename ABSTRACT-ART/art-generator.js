class AbstractArtGenerator {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvas.width = 800;
    this.canvas.height = 600;
    this.shapes = ['circle', 'rectangle', 'triangle', 'line', 'curve'];
  }

  getRandomColor(colorfulness) {
    const saturation = 70 + Math.random() * 30;
    const lightness = 40 + Math.random() * 20;
    const hue = Math.random() * 360;
    const alpha = 0.3 + (Math.random() * 0.7 * (colorfulness / 100));
    return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
  }

  drawShape(shape, color) {
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2 + Math.random() * 8;

    switch(shape) {
      case 'circle':
        const radius = 20 + Math.random() * 100;
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * this.canvas.height;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        Math.random() > 0.5 ? this.ctx.fill() : this.ctx.stroke();
        break;

      case 'rectangle':
        const width = 40 + Math.random() * 200;
        const height = 40 + Math.random() * 200;
        const rx = Math.random() * (this.canvas.width - width);
        const ry = Math.random() * (this.canvas.height - height);
        Math.random() > 0.5 ? 
          this.ctx.fillRect(rx, ry, width, height) :
          this.ctx.strokeRect(rx, ry, width, height);
        break;

      case 'triangle':
        const x1 = Math.random() * this.canvas.width;
        const y1 = Math.random() * this.canvas.height;
        const x2 = x1 + (-100 + Math.random() * 200);
        const y2 = y1 + (-100 + Math.random() * 200);
        const x3 = x1 + (-100 + Math.random() * 200);
        const y3 = y1 + (-100 + Math.random() * 200);
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineTo(x3, y3);
        this.ctx.closePath();
        Math.random() > 0.5 ? this.ctx.fill() : this.ctx.stroke();
        break;

      case 'line':
        const lx1 = Math.random() * this.canvas.width;
        const ly1 = Math.random() * this.canvas.height;
        const lx2 = Math.random() * this.canvas.width;
        const ly2 = Math.random() * this.canvas.height;
        this.ctx.beginPath();
        this.ctx.moveTo(lx1, ly1);
        this.ctx.lineTo(lx2, ly2);
        this.ctx.stroke();
        break;

      case 'curve':
        const cx1 = Math.random() * this.canvas.width;
        const cy1 = Math.random() * this.canvas.height;
        const cx2 = Math.random() * this.canvas.width;
        const cy2 = Math.random() * this.canvas.height;
        const cx3 = Math.random() * this.canvas.width;
        const cy3 = Math.random() * this.canvas.height;
        this.ctx.beginPath();
        this.ctx.moveTo(cx1, cy1);
        this.ctx.quadraticCurveTo(cx2, cy2, cx3, cy3);
        this.ctx.stroke();
        break;
    }
  }

  generate(complexity, colorfulness) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    const numShapes = complexity * 5;
    
    for (let i = 0; i < numShapes; i++) {
      const shape = this.shapes[Math.floor(Math.random() * this.shapes.length)];
      const color = this.getRandomColor(colorfulness);
      this.drawShape(shape, color);
    }
  }
}

// Initialize the generator
const canvas = document.getElementById('artCanvas');
const generator = new AbstractArtGenerator(canvas);

// Add event listeners
document.getElementById('generate').addEventListener('click', () => {
  const complexity = document.getElementById('complexity').value;
  const colorfulness = document.getElementById('colorfulness').value;
  generator.generate(complexity, colorfulness);
});

document.getElementById('save').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'abstract-art.png';
  link.href = canvas.toDataURL();
  link.click();
});

// Generate initial artwork
generator.generate(8, 50);