/*****************************************************************************
 * GRIP POWERUP - Gives player better traction on platforms
 *****************************************************************************/

class GripPowerup {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.collected = false;
    this.timer = 0;
    this.radius = 28;
  }

  update(dt) {
    this.timer += dt;
  }

  checkCollision(player) {
    if (this.collected) return false;

    const dx = (player.x + player.width / 2) - this.x;
    const dy = (player.y + player.height / 2) - this.y;

    if (Math.sqrt(dx * dx + dy * dy) < this.radius + 25) {
      this.collected = true;
      player.gripTimer = CONFIG.GRIP_DURATION;
      SFX.powerup();
      return true;
    }
    return false;
  }

  draw() {
    if (this.collected) return;

    const bobY = Math.sin(this.timer * 5) * 10;
    const pos = camera.worldToScreen(this.x, this.y + bobY);

    // Glow
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = CONFIG.COLORS.POWERUP_GRIP;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 45 + Math.sin(this.timer * 8) * 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Icon background
    ctx.fillStyle = '#0C0';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    // Grip icon
    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('G', pos.x, pos.y);
  }
}