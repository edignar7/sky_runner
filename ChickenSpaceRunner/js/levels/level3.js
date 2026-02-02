/*****************************************************************************
 * LEVEL 3 - The Gauntlet
 *****************************************************************************/

function createLevel3() {
  const platforms = generateProceduralPlatforms(50, 0.6);

  return {
    name: 'The Gauntlet',
    platforms: platforms,
    hazards: [
      new Pendulum(6000, 220, 320, 4.2),
      new Pendulum(9500, 180, 360, -4.8),
      new Pendulum(14000, 200, 340, 5.2),
      new Bomb(8000),
      new Bomb(12000)
    ],
    powerups: [
      new SlowmoPowerup(7000, 320),
      new DashPowerup(13000, 350)
    ],
    goalX: 20000,
    speedCurve: x => 380 + 0.0001 * x * x
  };
}

function generateProceduralPlatforms(count, collapseChance) {
  const platforms = [];
  let x = 0;

  for (let i = 0; i < count; i++) {
    const gap = 180 + Math.random() * 320;
    const width = 280 + Math.random() * 600;
    const y = 550 + Math.sin(i * 0.6) * 150;

    let type = 'normal';
    if (Math.random() < collapseChance) type = 'collapse';
    else if (Math.random() < 0.15) type = 'grip';
    else if (Math.random() < 0.1) type = Math.random() < 0.5 ? 'slant-left' : 'slant-right';

    platforms.push(new Platform(x + gap, y, width, type));
    x += gap + width;
  }

  return platforms;
}