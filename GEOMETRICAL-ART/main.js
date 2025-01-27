import { Turtle } from './turtle.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const shapeSelect = document.getElementById('shape');
const colorInput = document.getElementById('color');
const sizeInput = document.getElementById('size');
const clearBtn = document.getElementById('clear');

// Set canvas size
function resizeCanvas() {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = window.innerHeight - 150;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Initialize turtle
const turtle = new Turtle(canvas);

// Draw shape at mouse position
function drawShape(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  turtle.moveTo(x, y);
  turtle.setColor(colorInput.value);
  const size = parseInt(sizeInput.value);

  switch(shapeSelect.value) {
    case 'square':
      turtle.drawSquare(size);
      break;
    case 'triangle':
      turtle.drawTriangle(size);
      break;
    case 'circle':
      turtle.drawCircle(size/2);
      break;
    case 'star':
      turtle.drawStar(size);
      break;
  }
}

// Event listeners
canvas.addEventListener('click', drawShape);
clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});