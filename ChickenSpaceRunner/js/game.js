/*****************************************************************************
 * GAME - Core game logic and level management
 *****************************************************************************/

let level;

function loadLevel(num) {
  currentLevel = num;

  switch (num) {
    case 1: level = createLevel1(); break;
    case 2: level = createLevel2(); break;
    case 3: level = createLevel3(); break;
    case 4: level = createLevel4(); break;
    default: level = createLevel5(); break;
  }

  player.reset();
  gameState = 'playing';
  deathTimer = 0;
  winTimer = 0;
}

function updateGame(dt) {
  // Update player
  player.update(dt, level);

  // Update camera
  camera.update(player);

  // Update platforms
  for (const platform of level.platforms) {
    platform.update(dt);
  }

  // Update hazards
  for (const hazard of level.hazards) {
    hazard.update(dt, player);
    if (hazard.checkCollision(player)) {
      player.dead = true;
      SFX.death();
      camera.shake(30);
    }
  }

  // Update powerups
  for (const powerup of level.powerups) {
    powerup.update(dt);
    powerup.checkCollision(player);
  }

  // Check death
  if (player.dead) {
    gameState = 'dead';
    deathTimer = 0;
  }

  // Check win
  if (player.x > level.goalX + 100) {
    gameState = 'win';
    winTimer = 0;
    SFX.win();
  }
}

function drawGame() {
  // Draw platforms
  for (const platform of level.platforms) {
    platform.draw();
  }

  // Draw hazards
  for (const hazard of level.hazards) {
    hazard.draw();
  }

  // Draw powerups
  for (const powerup of level.powerups) {
    powerup.draw();
  }

  // Draw goal
  UI.drawGoal(level.goalX);

  // Draw player
  player.draw();
}