/*****************************************************************************
 * GAME CONFIGURATION - All constants and settings
 *****************************************************************************/

const CONFIG = {
  // Canvas
  WIDTH: 1280,
  HEIGHT: 720,

  // Physics
  GRAVITY: 2000,
  MAX_FALL_SPEED: 1400,
  JUMP_POWER: -780,
  PLAYER_ACCEL: 2200,
  PLAYER_FRICTION: 7,
  DASH_POWER: 1200,

  // Timing
  COYOTE_TIME: 0.12,
  JUMP_BUFFER: 0.15,
  COLLAPSE_TIME: 0.5,
  SLOWMO_DURATION: 4,
  GRIP_DURATION: 5,

  // Colors
  COLORS: {
    SKY_TOP: '#0a0a2a',
    SKY_BOTTOM: '#1a1a4a',
    PLATFORM: '#555',
    PLATFORM_GRIP: '#2a7',
    PLATFORM_COLLAPSE: '#665',
    PLATFORM_CRACKING: '#833',
    CHICKEN_BODY: '#FFD700',
    CHICKEN_WING: '#E6B800',
    CHICKEN_BEAK: '#FF6600',
    CHICKEN_COMB: '#FF3333',
    DANGER: '#D44',
    POWERUP_DASH: '#0FF',
    POWERUP_SLOWMO: '#FF0',
    POWERUP_GRIP: '#0F0'
  }
};

// Game state
let gameState = 'menu'; // menu, playing, dead, win
let currentLevel = 1;
let deathTimer = 0;
let winTimer = 0;

// Input
const keys = {};

// Canvas and context (initialized in main.js)
let canvas, ctx;