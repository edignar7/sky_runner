/*****************************************************************************
 * LEVEL 2 - The Path Breaks
 *****************************************************************************/

function createLevel2() {
  return {
    name: 'The Path Breaks',
    platforms: [
      new Platform(0, 550, 600),
      new Platform(750, 500, 400, 'collapse'),
      new Platform(1250, 480, 350, 'collapse'),
      new Platform(1700, 550, 800),
      new Platform(2600, 480, 500, 'grip'),
      new Platform(3200, 550, 700),
      new Platform(4000, 500, 400, 'collapse'),
      new Platform(4500, 520, 600),
      new Platform(5200, 450, 350, 'collapse'),
      new Platform(5650, 550, 1200),
      new Platform(6950, 500, 500),
      new Platform(7550, 550, 2500)
    ],
    hazards: [
      new Pendulum(4800, 280, 280, 3.2),
      new Pendulum(7200, 260, 300, -3.5),
      new Bomb(6200)
    ],
    powerups: [
      new SlowmoPowerup(3000, 380),
      new DashPowerup(8500, 420)
    ],
    goalX: 10000,
    speedCurve: x => 320 + 0.00008 * x * x
  };
}