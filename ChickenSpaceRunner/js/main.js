/*****************************************************************************
 * MAIN - Entry point and game loop
 *****************************************************************************/

// Initialize canvas
canvas = document.getElementById('game');
ctx = canvas.getContext('2d');
canvas.width = CONFIG.WIDTH;
canvas.height = CONFIG.HEIGHT;

// Initialize audio
initAudio();

// Input handlers
window.addEventListener('keydown', e => {
  keys[e.key.toLowerCase()] = true;

  // Resume audio on first input
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }

  // Menu start
  if (gameState === 'menu' && (e.key === ' ' || e.key === 'Enter')) {
    loadLevel(1);
  }

  // Restart on death
  if (gameState === 'dead' && deathTimer > 1 && (e.key === ' ' || e.key === 'Enter')) {
    loadLevel(currentLevel);
  }

  // Next level on win
  if (gameState === 'win' && winTimer > 1 && (e.key === ' ' || e.key === 'Enter')) {
    loadLevel(currentLevel + 1);
  }
});

window.addEventListener('keyup', e => {
  keys[e.key.toLowerCase()] = false;
});

// Game loop
let lastTime = performance.now();

function gameLoop(currentTime) {
  let dt = (currentTime - lastTime) / 1000;
  lastTime = currentTime;
  dt = Math.min(dt, 0.1);

  // Slowmo effect
  if (player.slowmoTimer > 0) dt *= 0.35;

  // === UPDATE ===
  if (gameState === 'playing') {
    updateGame(dt);
  }

  if (gameState === 'dead') deathTimer += dt;
  if (gameState === 'win') winTimer += dt;

  // === DRAW ===
  UI.drawBackground();

  if (gameState !== 'menu') {
    ctx.save();
    ctx.translate(camera.shakeX, camera.shakeY);
    drawGame();
    ctx.restore();
    UI.drawHUD(level);
  }

  // Overlays
  if (gameState === 'menu') UI.drawMenu();
  if (gameState === 'dead') UI.drawDeath();
  if (gameState === 'win') UI.drawWin();

  requestAnimationFrame(gameLoop);
}

// Start game loop
requestAnimationFrame(gameLoop);

console.log('%c🐔 CHICKEN SPACE RUNNER LOADED 🐔', 'color: gold; font-size: 24px; font-weight: bold;');
console.log('%cThe void awaits. Good luck.', 'color: white; font-size: 16px;');