/*****************************************************************************
 * PLAYER - The chicken protagonist with all controls and physics
 *****************************************************************************/

const player = {
  x: 100,
  y: 400,
  vx: 0,
  vy: 0,
  width: 50,
  height: 60,
  onGround: false,
  coyoteTime: 0,
  jumpBuffer: 0,
  runTimer: 0,
  dashReady: false,
  slowmoTimer: 0,
  gripTimer: 0,
  dead: false,

  reset() {
    this.x = 100;
    this.y = 400;
    this.vx = 0;
    this.vy = 0;
    this.onGround = false;
    this.coyoteTime = 0;
    this.jumpBuffer = 0;
    this.runTimer = 0;
    this.dashReady = false;
    this.slowmoTimer = 0;
    this.gripTimer = 0;
    this.dead = false;
  },

  update(dt, level) {
    if (this.dead) return;

    this.runTimer += dt;

    // Horizontal input
    let inputX = 0;
    if (keys['a'] || keys['arrowleft']) inputX -= 1;
    if (keys['d'] || keys['arrowright']) inputX += 1;

    // Smooth acceleration
    this.vx += (inputX * CONFIG.PLAYER_ACCEL - this.vx * CONFIG.PLAYER_FRICTION) * dt;

    // Auto forward speed (increases over distance)
    this.vx += level.speedCurve(this.x);

    // Dash
    if (keys['shift'] && this.dashReady && this.vx > 0) {
      this.vx += CONFIG.DASH_POWER;
      this.dashReady = false;
      camera.shake(20);
      SFX.dash();
    }

    // Gravity
    this.vy += CONFIG.GRAVITY * dt;
    if (this.vy > CONFIG.MAX_FALL_SPEED) this.vy = CONFIG.MAX_FALL_SPEED;

    // Platform collision
    const wasOnGround = this.onGround;
    this.onGround = false;

    for (const platform of level.platforms) {
      if (!platform.active) continue;

      // Landing on platform from above
      if (this.vy >= 0) {
        const playerBottom = this.y + this.height;
        const playerRight = this.x + this.width;
        const prevBottom = playerBottom - this.vy * dt;

        if (playerRight > platform.x && this.x < platform.x + platform.width) {
          if (playerBottom >= platform.y && prevBottom <= platform.y + 15) {
            this.y = platform.y - this.height;
            this.vy = 0;
            this.onGround = true;

            // Landing shake
            if (!wasOnGround) camera.shake(8);

            // Trigger collapse
            platform.startCracking();

            // Slanted platforms push player
            if (platform.type === 'slant-left') this.vx -= 200 * dt;
            if (platform.type === 'slant-right') this.vx += 200 * dt;
          }
        }
      }
    }

    // Coyote time
    if (this.onGround) {
      this.coyoteTime = CONFIG.COYOTE_TIME;
    } else {
      this.coyoteTime -= dt;
    }

    // Jump buffer
    if (keys[' '] || keys['w'] || keys['arrowup']) {
      this.jumpBuffer = CONFIG.JUMP_BUFFER;
    }
    if (this.jumpBuffer > 0) this.jumpBuffer -= dt;

    // Execute jump
    if (this.jumpBuffer > 0 && this.coyoteTime > 0) {
      this.vy = CONFIG.JUMP_POWER;
      this.jumpBuffer = 0;
      this.coyoteTime = 0;
      this.onGround = false;
      camera.shake(10);
      SFX.jump();
    }

    // Apply velocity
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    // Timers
    if (this.slowmoTimer > 0) this.slowmoTimer -= dt;
    if (this.gripTimer > 0) this.gripTimer -= dt;

    // Fell into void
    if (this.y > 1500) {
      this.dead = true;
      SFX.death();
      camera.shake(30);
    }
  },

  draw() {
    const bobY = this.onGround && this.vx > 100 ? Math.sin(this.runTimer * 20) * 5 : 0;
    const pos = camera.worldToScreen(this.x, this.y + bobY);

    // Speed lines
    if (this.vx > 700) {
      ctx.strokeStyle = 'rgba(150, 220, 255, 0.6)';
      ctx.lineWidth = 3;
      for (let i = 1; i <= 5; i++) {
        ctx.globalAlpha = 1 - i * 0.18;
        ctx.beginPath();
        ctx.moveTo(pos.x - i * 50, pos.y + 30 + Math.sin(i * 3) * 15);
        ctx.lineTo(pos.x - i * 50 - 80, pos.y + 30 + Math.sin(i * 3) * 15);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.ellipse(pos.x + 25, pos.y + this.height + 5, 30, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body
    ctx.fillStyle = CONFIG.COLORS.CHICKEN_BODY;
    ctx.beginPath();
    ctx.ellipse(pos.x + 25, pos.y + 35, 28, 32, 0, 0, Math.PI * 2);
    ctx.fill();

    // Wing (animated)
    const wingX = Math.sin(this.runTimer * 25) * 12;
    ctx.fillStyle = CONFIG.COLORS.CHICKEN_WING;
    ctx.beginPath();
    ctx.ellipse(pos.x + 5 + wingX, pos.y + 30, 18, 25, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.fillStyle = CONFIG.COLORS.CHICKEN_BODY;
    ctx.beginPath();
    ctx.arc(pos.x + 40, pos.y + 10, 22, 0, Math.PI * 2);
    ctx.fill();

    // Eye white
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.arc(pos.x + 48, pos.y + 6, 10, 0, Math.PI * 2);
    ctx.fill();

    // Eye pupil
    const eyeOffset = Math.min(this.vx / 500, 4);
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(pos.x + 50 + eyeOffset, pos.y + 6, 5, 0, Math.PI * 2);
    ctx.fill();

    // Beak
    ctx.fillStyle = CONFIG.COLORS.CHICKEN_BEAK;
    ctx.beginPath();
    ctx.moveTo(pos.x + 60, pos.y + 12);
    ctx.lineTo(pos.x + 80, pos.y + 18);
    ctx.lineTo(pos.x + 60, pos.y + 24);
    ctx.closePath();
    ctx.fill();

    // Comb
    ctx.fillStyle = CONFIG.COLORS.CHICKEN_COMB;
    ctx.beginPath();
    ctx.arc(pos.x + 35, pos.y - 8, 8, 0, Math.PI * 2);
    ctx.arc(pos.x + 45, pos.y - 10, 7, 0, Math.PI * 2);
    ctx.arc(pos.x + 53, pos.y - 6, 6, 0, Math.PI * 2);
    ctx.fill();

    // Feet (animated)
    const footOffset = Math.sin(this.runTimer * 30) * 8;
    ctx.fillStyle = CONFIG.COLORS.CHICKEN_BEAK;
    ctx.fillRect(pos.x + 15 + footOffset, pos.y + this.height - 5, 8, 12);
    ctx.fillRect(pos.x + 30 - footOffset, pos.y + this.height - 5, 8, 12);

    // Dash ready indicator
    if (this.dashReady) {
      ctx.strokeStyle = CONFIG.COLORS.POWERUP_DASH;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(pos.x + 25, pos.y + 30, 40 + Math.sin(this.runTimer * 10) * 5, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Slowmo effect
    if (this.slowmoTimer > 0) {
      ctx.fillStyle = `rgba(255, 200, 0, ${0.2 * (this.slowmoTimer / CONFIG.SLOWMO_DURATION)})`;
      ctx.fillRect(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT);
    }
  }
};