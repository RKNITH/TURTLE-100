import { Turtle } from './turtle.js';

const canvas = document.getElementById('canvas');
const lengthSlider = document.getElementById('length');
const angleSlider = document.getElementById('angle');
const depthSlider = document.getElementById('depth');
const drawButton = document.getElementById('draw');
const clearButton = document.getElementById('clear');

// Set canvas size
function resizeCanvas() {
  canvas.width = window.innerWidth - 40;
  canvas.height = window.innerHeight - 120;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const turtle = new Turtle(canvas);

function drawTree(length, angle, depth) {
  if (depth === 0) return;

  turtle.forward(length);
  
  turtle.push();
  turtle.left(angle);
  drawTree(length * 0.7, angle, depth - 1);
  turtle.pop();
  
  turtle.push();
  turtle.right(angle);
  drawTree(length * 0.7, angle, depth - 1);
  turtle.pop();
}

function draw() {
  turtle.clear();
  const length = parseInt(lengthSlider.value);
  const angle = parseInt(angleSlider.value);
  const depth = parseInt(depthSlider.value);
  
  // Set color based on depth
  const hue = (depth * 30) % 360;
  turtle.ctx.strokeStyle = `hsl(${hue}, 70%, 50%)`;
  
  drawTree(length, angle, depth);
}

drawButton.addEventListener('click', draw);
clearButton.addEventListener('click', () => turtle.clear());

// Initial draw
draw();