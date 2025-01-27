import { Turtle } from './turtle.js';

const canvas = document.getElementById('turtleCanvas');
const angleInput = document.getElementById('angle');
const sizeInput = document.getElementById('size');
const iterationsInput = document.getElementById('iterations');
const colorInput = document.getElementById('color');
const drawButton = document.getElementById('draw');
const clearButton = document.getElementById('clear');

// Update value displays
const angleValue = document.getElementById('angleValue');
const sizeValue = document.getElementById('sizeValue');
const iterationsValue = document.getElementById('iterationsValue');

angleInput.addEventListener('input', () => angleValue.textContent = `${angleInput.value}°`);
sizeInput.addEventListener('input', () => sizeValue.textContent = sizeInput.value);
iterationsInput.addEventListener('input', () => iterationsValue.textContent = iterationsInput.value);

// Set canvas size
function resizeCanvas() {
  const container = document.querySelector('.container');
  const controls = document.querySelector('.controls');
  const width = container.clientWidth - controls.clientWidth - 40;
  const height = window.innerHeight - 40;
  
  canvas.width = width;
  canvas.height = height;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Initialize turtle
const turtle = new Turtle(canvas);

function drawSpiral() {
  const angle = parseInt(angleInput.value);
  const size = parseInt(sizeInput.value);
  const iterations = parseInt(iterationsInput.value);
  const color = colorInput.value;

  turtle.clear();
  turtle.setColor(color);

  let stepSize = size;
  for (let i = 0; i < iterations; i++) {
    turtle.forward(stepSize);
    turtle.right(angle);
    stepSize += 0.1;
  }
}

drawButton.addEventListener('click', drawSpiral);
clearButton.addEventListener('click', () => turtle.clear());

// Initial draw
drawSpiral();