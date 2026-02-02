/*****************************************************************************
 * LEVEL 5 - ABYSS MODE (Endless-style final level)
 *****************************************************************************/

function createLevel5() {
  const platforms = generateProceduralPlatforms(200, 0.75);
  const hazards = generateProceduralHazards();
  const powerups = generateProceduralPowerups();

  return {
    name: '∞ ABYSS MODE ∞',
    platforms: platforms,
    hazards: hazards,
    powerups: powerups,
    goalX: 100000,
    speedCurve: x => 500 + 0.00018 * x * x + Math.sin(x * 0.0001) * 100
  };
}

function generateProceduralHazards() {
  const hazards = [];

  for (let i = 0; i < 25; i++) {
    const x = 8000 + i * 4000 + Math.random() * 2000;

    if (Math.random() < 0.5) {
      hazards.push(new Pendulum(x, 150 + Math.random() * 100, 300 + Math.random() * 150, (Math.random() < 0.5 ? 1 : -1) * (4 + i * 0.15)));
    } else if (Math.random() < 0.6) {
      hazards.push(new Bomb(x));
    } else {
      hazards.push(new WindZone(x, 2000 + Math.random() * 2000, 1500 + Math.random() * 1500, Math.random() < 0.5));
    }
  }

  return hazards;
}

function generateProceduralPowerups() {
  const powerups = [];

  for (let i = 0; i < 15; i++) {
    const x = 5000 + i * 6000 + Math.random() * 3000;
    const y = 350 + Math.random() * 100;
    const rand = Math.random();

    if (rand < 0.33) {
      powerups.push(new DashPowerup(x, y));
    } else if (rand < 0.66) {
      powerups.push(new SlowmoPowerup(x, y));
    } else {
      powerups.push(new GripPowerup(x, y));
    }
  }

  return powerups;
}