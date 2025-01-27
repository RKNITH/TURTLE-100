class Snake {
  constructor(size) {
    this.size = size;
    this.reset();
  }

  reset() {
    this.x = 0;
    this.y = 0;
    this.body = [{x: 0, y: 0}];
    this.direction = 'right';
    this.nextDirection = 'right';
  }

  update() {
    this.direction = this.nextDirection;
    
    // Update head position
    switch(this.direction) {
      case 'up': this.y -= this.size; break;
      case 'down': this.y += this.size; break;
      case 'left': this.x -= this.size; break;
      case 'right': this.x += this.size; break;
    }

    // Add new head
    this.body.unshift({x: this.x, y: this.y});
  }

  grow() {
    // Keep the last tail segment by not removing it
    const lastTail = this.body[this.body.length - 1];
    this.update();
    // Add an extra segment at the last tail position
    this.body.push({...lastTail});
  }

  move() {
    this.update();
    // Remove tail
    this.body.pop();
  }
}

class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.gridSize = 20;
    this.canvas.width = 400;
    this.canvas.height = 400;
    
    this.snake = new Snake(this.gridSize);
    this.food = {x: 0, y: 0};
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem('snakeHighScore')) || 0;
    
    this.gameOverScreen = document.querySelector('.game-over');
    this.scoreElement = document.getElementById('score');
    this.highScoreElement = document.getElementById('highScore');
    this.finalScoreElement = document.getElementById('finalScore');
    
    this.bindEvents();
    this.reset();
    this.start();
  }

  bindEvents() {
    document.addEventListener('keydown', (e) => this.handleInput(e));
    document.getElementById('restartButton').addEventListener('click', () => this.reset());
  }

  handleInput(e) {
    const directions = {
      'ArrowUp': 'up',
      'ArrowDown': 'down',
      'ArrowLeft': 'left',
      'ArrowRight': 'right'
    };

    const newDirection = directions[e.key];
    if (!newDirection) return;

    const opposites = {
      'up': 'down',
      'down': 'up',
      'left': 'right',
      'right': 'left'
    };

    if (opposites[newDirection] !== this.snake.direction) {
      this.snake.nextDirection = newDirection;
    }
  }

  generateFood() {
    const maxX = (this.canvas.width / this.gridSize) - 1;
    const maxY = (this.canvas.height / this.gridSize) - 1;
    
    do {
      this.food.x = Math.floor(Math.random() * maxX) * this.gridSize;
      this.food.y = Math.floor(Math.random() * maxY) * this.gridSize;
    } while (this.snake.body.some(segment => 
      segment.x === this.food.x && segment.y === this.food.y));
  }

  checkCollision() {
    const head = this.snake.body[0];

    // Wall collision
    if (head.x < 0 || head.x >= this.canvas.width ||
        head.y < 0 || head.y >= this.canvas.height) {
      return true;
    }

    // Self collision
    return this.snake.body.slice(1).some(segment =>
      segment.x === head.x && segment.y === head.y);
  }

  update() {
    const head = this.snake.body[0];

    if (head.x === this.food.x && head.y === this.food.y) {
      this.score++;
      this.scoreElement.textContent = this.score;
      this.snake.grow();
      this.generateFood();
    } else {
      this.snake.move();
    }

    if (this.checkCollision()) {
      this.gameOver();
    }
  }

  draw() {
    // Clear canvas
    this.ctx.fillStyle = '#ecf0f1';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw snake
    this.ctx.fillStyle = '#2ecc71';
    this.snake.body.forEach(segment => {
      this.ctx.fillRect(segment.x, segment.y, this.gridSize - 1, this.gridSize - 1);
    });

    // Draw food
    this.ctx.fillStyle = '#e74c3c';
    this.ctx.fillRect(this.food.x, this.food.y, this.gridSize - 1, this.gridSize - 1);
  }

  gameLoop() {
    this.update();
    this.draw();
  }

  start() {
    if (this.gameInterval) return;
    this.gameInterval = setInterval(() => this.gameLoop(), 100);
  }

  gameOver() {
    clearInterval(this.gameInterval);
    this.gameInterval = null;
    
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('snakeHighScore', this.highScore);
      this.highScoreElement.textContent = this.highScore;
    }
    
    this.finalScoreElement.textContent = this.score;
    this.gameOverScreen.classList.remove('hidden');
  }

  reset() {
    this.snake.reset();
    this.score = 0;
    this.scoreElement.textContent = this.score;
    this.highScoreElement.textContent = this.highScore;
    this.gameOverScreen.classList.add('hidden');
    this.generateFood();
    
    if (!this.gameInterval) {
      this.start();
    }
  }
}

// Start the game
new Game();