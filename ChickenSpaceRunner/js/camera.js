/*****************************************************************************
 * CAMERA - Follows player with screen shake effects
 *****************************************************************************/

const camera = {
  x: 0,
  shakeIntensity: 0,
  shakeX: 0,
  shakeY: 0,

  shake(power) {
    this.shakeIntensity = Math.max(this.shakeIntensity, power);
  },

  update(player) {
    // Follow player (offset so player is on left side of screen)
    this.x = player.x - 400;

    // Decay shake
    this.shakeIntensity *= 0.88;

    // Random shake offset
    this.shakeX = (Math.random() - 0.5) * this.shakeIntensity;
    this.shakeY = (Math.random() - 0.5) * this.shakeIntensity;
  },

  // Convert world coordinates to screen coordinates
  worldToScreen(x, y) {
    return {
      x: x - this.x + this.shakeX,
      y: y + this.shakeY
    };
  }
};