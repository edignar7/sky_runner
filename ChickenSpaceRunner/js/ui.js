/*****************************************************************************
 * UI - All user interface drawing functions
 *****************************************************************************/

const UI = {
  drawBackground() {
    // Gradient sky
    const grad = ctx.createLinearGradient(0, 0, 0, CONFIG.HEIGHT);
    grad.addColorStop(0, CONFIG.COLORS.SKY_TOP);
    grad.addColorStop(1, CONFIG.COLORS.SKY_BOTTOM);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT);

    // Stars (parallax)
    const time = performance.now();
    for (let i = 0; i < 150; i++) {
      const starX = ((i * 173 + time * 0.02 - camera.x * 0.1) % (CONFIG.WIDTH + 200)) - 100;
      const starY = (i * 237) % CONFIG.HEIGHT;
      const brightness = 0.4 + 0.6 * Math.sin(time * 0.002 + i);
      ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
      ctx.fillRect(starX, starY, 3, 3);
    }

    // Distant planets
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#4a2a6a';
    ctx.beginPath();
    ctx.arc(200 - camera.x * 0.05, 150, 80, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#2a4a6a';
    ctx.beginPath();
    ctx.arc(900 - camera.x * 0.03, 100, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  },

  drawGoal(goalX) {
    const pos = camera.worldToScreen(goalX, 350);

    // Pole
    ctx.fillStyle = '#88F';
    ctx.fillRect(pos.x, pos.y, 20, 250);

    // Flag
    const wave = Math.sin(performance.now() * 0.005) * 10;
    ctx.fillStyle = '#FF0';
    ctx.beginPath();
    ctx.moveTo(pos.x + 20, pos.y);
    ctx.lineTo(pos.x + 140 + wave, pos.y + 50);
    ctx.lineTo(pos.x + 20, pos.y + 100);
    ctx.closePath();
    ctx.fill();

    // Text
    ctx.fillStyle = '#000';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GOAL', pos.x + 75, pos.y + 60);
  },

  drawHUD(level) {
    // Distance
    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 32px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`Distance: ${Math.floor(player.x / 100)}m`, 30, 50);

    // Level name
    ctx.font = '24px monospace';
    ctx.fillText(`Level ${currentLevel}: ${level.name}`, 30, 85);

    // Speed
    const speed = Math.floor(player.vx);
    ctx.fillStyle = speed > 800 ? '#F44' : (speed > 500 ? '#FA0' : '#FFF');
    ctx.fillText(`Speed: ${speed}`, 30, 120);

    // Powerup indicators
    if (player.dashReady) {
      ctx.fillStyle = '#0FF';
      ctx.font = 'bold 28px Arial';
      ctx.fillText('⚡ DASH READY [SHIFT]', 30, 160);
    }
    if (player.slowmoTimer > 0) {
      ctx.fillStyle = '#FF0';
      ctx.font = 'bold 28px Arial';
      ctx.fillText(`⏱ SLOWMO: ${player.slowmoTimer.toFixed(1)}s`, 30, 195);
    }
    if (player.gripTimer > 0) {
      ctx.fillStyle = '#0F0';
      ctx.font = 'bold 28px Arial';
      ctx.fillText(`🦶 GRIP: ${player.gripTimer.toFixed(1)}s`, 30, 230);
    }
  },

  drawMenu() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT);

    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 90px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🐔 CHICKEN SPACE RUNNER 🐔', CONFIG.WIDTH / 2, 200);

    ctx.fillStyle = '#FFF';
    ctx.font = '32px Arial';
    ctx.fillText('The road is broken. The void awaits.', CONFIG.WIDTH / 2, 280);

    ctx.font = '28px monospace';
    ctx.fillStyle = '#AAA';
    ctx.fillText('CONTROLS:', CONFIG.WIDTH / 2, 380);
    ctx.fillText('← → or A D  =  Move Left/Right', CONFIG.WIDTH / 2, 420);
    ctx.fillText('SPACE or W or ↑  =  Jump', CONFIG.WIDTH / 2, 460);
    ctx.fillText('SHIFT  =  Dash (when ready)', CONFIG.WIDTH / 2, 500);

    ctx.fillStyle = '#0F0';
    ctx.font = 'bold 40px Arial';
    const blink = Math.sin(performance.now() * 0.005) > 0;
    if (blink) ctx.fillText('PRESS SPACE TO START', CONFIG.WIDTH / 2, 600);
  },

  drawDeath() {
    ctx.fillStyle = `rgba(80, 0, 0, ${Math.min(deathTimer * 0.8, 0.9)})`;
    ctx.fillRect(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT);

    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 100px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('FELL INTO THE VOID', CONFIG.WIDTH / 2, 320);

    ctx.font = '36px Arial';
    ctx.fillText(`Distance: ${Math.floor(player.x / 100)}m`, CONFIG.WIDTH / 2, 400);

    if (deathTimer > 1) {
      ctx.fillStyle = '#0F0';
      ctx.font = 'bold 36px Arial';
      const blink = Math.sin(performance.now() * 0.006) > 0;
      if (blink) ctx.fillText('PRESS SPACE TO RETRY', CONFIG.WIDTH / 2, 500);
    }
  },

  drawWin() {
    ctx.fillStyle = `rgba(0, 50, 0, ${Math.min(winTimer * 0.8, 0.9)})`;
    ctx.fillRect(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT);

    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 100px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('LEVEL COMPLETE!', CONFIG.WIDTH / 2, 300);

    ctx.fillStyle = '#FFF';
    ctx.font = '40px Arial';
    ctx.fillText(`Level ${currentLevel}: ${level.name}`, CONFIG.WIDTH / 2, 380);

    if (winTimer > 1) {
      ctx.fillStyle = '#0F0';
      ctx.font = 'bold 40px Arial';
      const blink = Math.sin(performance.now() * 0.006) > 0;
      if (blink) ctx.fillText('PRESS SPACE FOR NEXT LEVEL', CONFIG.WIDTH / 2, 500);
    }
  }
};