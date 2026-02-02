/*****************************************************************************
 * PLATFORM - Different platform types with behaviors
 *****************************************************************************/

class Platform {
  constructor(x, y, width, type = 'normal') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 24;
    this.type = type; // normal, collapse, grip, slant-left, slant-right
    this.active = true;
    this.cracking = false;
    this.crackTimer = 0;
  }

  update(dt) {
    if (this.cracking) {
      this.crackTimer -= dt;
      if (this.crackTimer <= 0) {
        this.active = false;
        camera.shake(15);
        SFX.collapse();
      }
    }
  }

  startCracking() {
    if (!this.cracking && this.type === 'collapse') {
      this.cracking = true;
      this.crackTimer = CONFIG.COLLAPSE_TIME;
    }
  }

  draw() {
    if (!this.active) return;

    const pos = camera.worldToScreen(this.x, this.y);

    // Platform color based on type
    let color = CONFIG.COLORS.PLATFORM;
    if (this.type === 'grip') color = CONFIG.COLORS.PLATFORM_GRIP;
    if (this.type === 'collapse') color = this.cracking ? CONFIG.COLORS.PLATFORM_CRACKING : CONFIG.COLORS.PLATFORM_COLLAPSE;
    if (this.type === 'slant-left' || this.type === 'slant-right') color = '#557';

    // Main platform
    ctx.fillStyle = color;
    ctx.fillRect(pos.x, pos.y, this.width, this.height);

    // Top highlight
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(pos.x, pos.y, this.width, 4);

    // Cracks when collapsing
    if (this.cracking) {
      ctx.strokeStyle = '#F44';
      ctx.lineWidth = 3;
      for (let i = 0; i < 8; i++) {
        const cx = pos.x + Math.random() * this.width;
        ctx.beginPath();
        ctx.moveTo(cx, pos.y);
        ctx.lineTo(cx + (Math.random() - 0.5) * 30, pos.y + this.height);
        ctx.stroke();
      }
    }

    // Grip indicator (green dots)
    if (this.type === 'grip') {
      ctx.fillStyle = '#5f8';
      for (let i = 20; i < this.width; i += 40) {
        ctx.beginPath();
        ctx.arc(pos.x + i, pos.y + 12, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}