/*****************************************************************************
 * LEVEL 1 - Tutorial level
 *****************************************************************************/

function createLevel1() {
  return {
    name: 'Tutorial',
    platforms: [
      new Platform(0, 550, 800),
      new Platform(900, 520, 600),
      new Platform(1600, 550, 1000),
      new Platform(2700, 500, 500, 'collapse'),
      new Platform(3300, 550, 800),
      new Platform(4200, 480, 400, 'grip'),
      new Platform(4700, 550, 1500),
      new Platform(6300, 520, 600),
      new Platform(7000, 550, 3000)
    ],
    hazards: [
      new Pendulum(5800, 300, 260, 2.8)
    ],
    powerups: [
      new DashPowerup(5200, 400)
    ],
    goalX: 9800,
    speedCurve: x => 280 + 0.00006 * x * x
  };
}