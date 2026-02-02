/*****************************************************************************
 * WIND ZONE HAZARD - Pushes player sideways
 *****************************************************************************/

class WindZone {
  constructor(x, width, strength, goingRight = true) {
    this.x = x;
    this.width = width;
    this.strength = strength;
    this.goingRight = goingRight;
    this.timer = 0;
  }

  update(dt, player) {
    this.timer += dt;

    // Apply force if player is in zone
    if (player.x + player.width > this.x && player.x < this.x + this.width) {
      const direction = this.goingRight ? 1 : -1;
      const pulse = 0.7 + 0.3 * Math.sin(this.timer * 6);
      player.vx += direction * this.strength * pulse * dt;
    }
  }

  checkCollision() {
    return false; // Wind doesn't kill, just pushes
  }

  draw() {
    const pos = camera.worldToScreen(this.x, 100);

    // Wind zone visualization
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = this.goingRight ? '#0AF' : '#F0A';
    ctx.fillRect(pos.x, pos.y, this.width, 600);
    ctx.globalAlpha = 1;

    // Animated wind lines
    ctx.strokeStyle = this.goingRight ? '#0CF' : '#F5A';
    ctx.lineWidth = 3;

    for (let i = 0; i < 15; i++) {
      const ly = 150 + i * 40;
      const offset = (this.timer * 400 * (this.goingRight ? 1 : -1) + i * 50) % this.width;
      const lx = pos.x + (this.goingRight ? offset : this.width - offset);

      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.moveTo(lx, ly);
      ctx.lineTo(lx + (this.goingRight ? 60 : -60), ly);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }
}