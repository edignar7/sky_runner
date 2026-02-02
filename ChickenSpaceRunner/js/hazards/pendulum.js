/*****************************************************************************
 * PENDULUM HAZARD - Swinging obstacle
 *****************************************************************************/

class Pendulum {
  constructor(pivotX, pivotY, length, speed) {
    this.pivotX = pivotX;
    this.pivotY = pivotY;
    this.length = length;
    this.speed = speed;
    this.angle = Math.random() * Math.PI;
    this.ballRadius = 45;
  }

  update(dt) {
    this.angle += this.speed * dt;
  }

  getBallPosition() {
    return {
      x: this.pivotX + Math.sin(this.angle) * this.length,
      y: this.pivotY + Math.cos(this.angle) * this.length
    };
  }

  checkCollision(player) {
    const ball = this.getBallPosition();
    const dx = (player.x + player.width / 2) - ball.x;
    const dy = (player.y + player.height / 2) - ball.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.ballRadius + 20;
  }

  draw() {
    const ball = this.getBallPosition();
    const pivot = camera.worldToScreen(this.pivotX, this.pivotY);
    const ballPos = camera.worldToScreen(ball.x, ball.y);

    // Chain
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(pivot.x, pivot.y);
    ctx.lineTo(ballPos.x, ballPos.y);
    ctx.stroke();

    // Pivot
    ctx.fillStyle = '#666';
    ctx.beginPath();
    ctx.arc(pivot.x, pivot.y, 15, 0, Math.PI * 2);
    ctx.fill();

    // Ball
    ctx.fillStyle = CONFIG.COLORS.DANGER;
    ctx.beginPath();
    ctx.arc(ballPos.x, ballPos.y, this.ballRadius, 0, Math.PI * 2);
    ctx.fill();

    // Spikes
    ctx.fillStyle = '#A22';
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + this.angle;
      ctx.beginPath();
      ctx.moveTo(ballPos.x + Math.cos(a) * 40, ballPos.y + Math.sin(a) * 40);
      ctx.lineTo(ballPos.x + Math.cos(a) * 60, ballPos.y + Math.sin(a) * 60);
      ctx.lineTo(ballPos.x + Math.cos(a + 0.3) * 40, ballPos.y + Math.sin(a + 0.3) * 40);
      ctx.fill();
    }
  }
}