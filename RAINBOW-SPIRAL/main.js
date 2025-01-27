import { Turtle } from './turtle.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
  canvas.width = window.innerWidth - 100;
  canvas.height = window.innerHeight - 100;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const turtle = new Turtle(canvas);

function getHSLColor(step, totalSteps) {
  const hue = (step / totalSteps) * 360;
  return `hsl(${hue}, 100%, 50%)`;
}

function drawSpiral(steps, stepSize, turnAngle, animate = false) {
  turtle.clear();
  turtle.reset();
  
  if (animate) {
    let currentStep = 0;
    
    function animationFrame() {
      if (currentStep < steps) {
        turtle.setColor(getHSLColor(currentStep, steps));
        turtle.forward(stepSize + (currentStep / 20));
        turtle.right(turnAngle);
        currentStep++;
        requestAnimationFrame(animationFrame);
      }
    }
    
    animationFrame();
  } else {
    for (let i = 0; i < steps; i++) {
      turtle.setColor(getHSLColor(i, steps));
      turtle.forward(stepSize + (i / 20));
      turtle.right(turnAngle);
    }
  }
}

// UI Controls
const stepsInput = document.getElementById('steps');
const stepSizeInput = document.getElementById('stepSize');
const angleInput = document.getElementById('angle');
const drawButton = document.getElementById('draw');
const animateButton = document.getElementById('animate');

function getCurrentParams() {
  return {
    steps: parseInt(stepsInput.value),
    stepSize: parseInt(stepSizeInput.value),
    angle: parseInt(angleInput.value)
  };
}

drawButton.addEventListener('click', () => {
  const params = getCurrentParams();
  drawSpiral(params.steps, params.stepSize, params.angle);
});

animateButton.addEventListener('click', () => {
  const params = getCurrentParams();
  drawSpiral(params.steps, params.stepSize, params.angle, true);
});

// Initial draw
const initialParams = getCurrentParams();
drawSpiral(initialParams.steps, initialParams.stepSize, initialParams.angle);