/*****************************************************************************
 * LEVEL 4 - Wind From Hell
 *****************************************************************************/

function createLevel4() {
  const platforms = generateProceduralPlatforms(60, 0.65);

  return {
    name: 'Wind From Hell',
    platforms: platforms,
    hazards: [
      new Pendulum(7000, 200, 350, 5.5),
      new Pendulum(12000, 180, 380, -6.0),
      new Pendulum(18000, 150, 400, 6.5),
      new Bomb(10000),
      new Bomb(15000),
      new Bomb(20000),
      new WindZone(8000, 2500, 1800, false),
      new WindZone(14000, 3000, 2200, true),
      new WindZone(21000, 2800, 2600, false)
    ],
    powerups: [
      new SlowmoPowerup(9000, 300),
      new DashPowerup(16000, 320),
      new GripPowerup(22000, 350)
    ],
    goalX: 28000,
    speedCurve: x => 450 + 0.00013 * x * x
  };
}