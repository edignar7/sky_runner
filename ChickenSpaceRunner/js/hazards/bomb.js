/*****************************************************************************
 * BOMB HAZARD - Falling bomb with warning indicator
 *****************************************************************************/

class Bomb {
  constructor(x, delay = 1.5) {
    this.x = x;
    this.y = -100;
    this.vy = 0;
    this.warningTime = delay;
    this.exploded = false;
    this.radius = 35;
  }

  update(dt) {
    if (this.warningTime > 0) {
      this.warningTime -= dt;
    } else if (!this.exploded) {
      this.vy += 1000 * dt;
      this.y += this.vy * dt;
      if (this.y > 1500) this.exploded = true;
    }
  }

  checkCollision(player) {
    if (this.warningTime > 0 || this.exploded) return false;
    const dx = (player.x + player.width / 2) - this.x;
    const dy = (player.y + player.height / 2) - this.y;
    return Math.sqrt(dx * dx + dy * dy) < this.radius + 25;
  }

  draw() {
    const pos = camera.worldToScreen(this.x, this.y);

    if (this.warningTime > 0) {
      // Warning indicator on ground
      const warningPos = camera.worldToScreen(this.x, 580);
      ctx.globalAlpha = 0.4 + 0.4 * Math.sin(performance.now() * 0.015);
      ctx.fillStyle = '#F00';
      ctx.beginPath();
      ctx.arc(warningPos.x, warningPos.y, 70, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFF';
      ctx.font = 'bold 50px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('!', warningPos.x, warningPos.y + 18);
      ctx.globalAlpha = 1;
    } else if (!this.exploded) {
      // Bomb body
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, this.radius, 0, Math.PI * 2);
      ctx.fill();

      // Fuse
      ctx.strokeStyle = '#F80';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y - this.radius);
      ctx.quadraticCurveTo(pos.x + 15, pos.y - this.radius - 20, pos.x + 10, pos.y - this.radius - 30);
      ctx.stroke();

      // Spark
      ctx.fillStyle = '#FF0';
      ctx.beginPath();
      ctx.arc(pos.x + 10, pos.y - this.radius - 30, 8 + Math.sin(performance.now() * 0.03) * 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}