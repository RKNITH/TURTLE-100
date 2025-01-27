import { Turtle } from './turtle.js';

// Create a function to initialize the race
function initializeRace() {
  const startX = 50;
  const finishLine = 750;
  const svg = document.getElementById('raceTrack');
  
  // Check if SVG exists
  if (!svg) {
    console.error('Race track SVG not found!');
    return;
  }

  const startButton = document.getElementById('startRace');
  const resetButton = document.getElementById('resetRace');
  const winnerDisplay = document.getElementById('winner');

  // Create turtles
  const turtles = [
    new Turtle(startX, 100, '#e74c3c', 'Red Turtle'),
    new Turtle(startX, 200, '#2ecc71', 'Green Turtle'),
    new Turtle(startX, 300, '#3498db', 'Blue Turtle')
  ];

  // Add turtles to SVG
  turtles.forEach(turtle => svg.appendChild(turtle.element));

  let raceInterval;
  let raceInProgress = false;

  function startRace() {
    if (raceInProgress) return;
    
    raceInProgress = true;
    startButton.disabled = true;
    winnerDisplay.textContent = '';
    
    // Set random speeds for each turtle
    turtles.forEach(turtle => turtle.setRandomSpeed());
    
    raceInterval = setInterval(() => {
      let someoneWon = false;
      
      turtles.forEach(turtle => {
        const position = turtle.move();
        
        if (position >= finishLine && !someoneWon) {
          someoneWon = true;
          endRace(turtle);
        }
      });
    }, 16); // ~60fps
  }

  function endRace(winner) {
    clearInterval(raceInterval);
    raceInProgress = false;
    startButton.disabled = false;
    winnerDisplay.textContent = `${winner.name} wins!`;
  }

  function resetRace() {
    clearInterval(raceInterval);
    raceInProgress = false;
    startButton.disabled = false;
    winnerDisplay.textContent = '';
    turtles.forEach(turtle => turtle.reset(startX));
  }

  startButton.addEventListener('click', startRace);
  resetButton.addEventListener('click', resetRace);
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeRace);
} else {
  initializeRace();
}