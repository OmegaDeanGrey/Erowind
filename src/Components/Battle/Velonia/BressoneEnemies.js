// BressoneEnemies.js

const createGoblin = (id = 0) => ({
  id: `goblin-${id}`,
  name: `Goblin ${id + 1}`,
  role: "Goblin",
  maxHP: 30,
  currentHP: 30,
  strength: 30,
  defense: 20,
  speed: 30,
  experienceYield: 5,
  action: {
    name: "Hit",
    type: "damage",
    power: 20,
    target: "singleEnemy",
    damageType: "physical",
    perform: ({ attacker, targets }) => {
      const aliveTargets = targets.filter((t) => t.currentHP > 0);
      if (aliveTargets.length === 0) return null;
      const target =
        aliveTargets[Math.floor(Math.random() * aliveTargets.length)];

      const damage = Math.max(1, attacker.strength - target.defense);
      return {
        targetId: target.id,
        newHP: Math.max(0, target.currentHP - damage),
        actionLog: `${attacker.name} uses Hit on ${target.name} for ${damage} damage!`,
        damage,
      };
    },
  },
});

const createOrc = (id = 0) => ({
  id: `orc-${id}`,
  name: `Orc ${id + 1}`,
  role: "Orc",
  maxHP: 40,
  currentHP: 40,
  strength: 35,
  defense: 30,
  speed: 10,
  experienceYield: 10,
  action: {
    name: "Club",
    type: "damage",
    power: 35,
    target: "singleEnemy",
    damageType: "physical",
    perform: ({ attacker, targets }) => {
      const aliveTargets = targets.filter((t) => t.currentHP > 0);
      if (aliveTargets.length === 0) return null;
      const target =
        aliveTargets[Math.floor(Math.random() * aliveTargets.length)];

      const damage = Math.max(1, attacker.strength - target.defense);
      return {
        targetId: target.id,
        newHP: Math.max(0, target.currentHP - damage),
        actionLog: `${attacker.name} uses Club on ${target.name} for ${damage} damage!`,
        damage,
      };
    },
  },
});

const createSpriggan = (id = 0) => ({
  id: `spriggan-${id}`,
  name: `Spriggan ${id + 1}`,
  role: "Spriggan",
  maxHP: 40,
  currentHP: 40,
  strength: 25,
  defense: 20,
  speed: 60,
  experienceYield: 10,
  action: {
    name: "Shenanigans",
    type: "damage",
    power: 25,
    target: "singleEnemy",
    damageType: "physical",
    perform: ({ attacker, targets }) => {
      const aliveTargets = targets.filter((t) => t.currentHP > 0);
      if (aliveTargets.length === 0) return null;
      const target =
        aliveTargets[Math.floor(Math.random() * aliveTargets.length)];

      const damage = Math.max(1, attacker.strength - target.defense);
      return {
        targetId: target.id,
        newHP: Math.max(0, target.currentHP - damage),
        actionLog: `${attacker.name} uses Shenanigans on ${target.name} for ${damage} damage!`,
        damage,
      };
    },
  },
});

const createNightMare = (id = 0) => ({
  id: `nightmare-${id}`,
  name: `NightMare ${id + 1}`,
  role: "NightMare",
  maxHP: 50,
  currentHP: 50,
  strength: 35,
  defense: 40,
  speed: 40,
  experienceYield: 20,
  action: {
    name: "PhantomKick",
    type: "damage",
    power: 35,
    target: "singleEnemy",
    damageType: "physical",
    perform: ({ attacker, targets }) => {
      const aliveTargets = targets.filter((t) => t.currentHP > 0);
      if (aliveTargets.length === 0) return null;
      const target =
        aliveTargets[Math.floor(Math.random() * aliveTargets.length)];

      const damage = Math.max(1, attacker.strength);
      return {
        targetId: target.id,
        newHP: Math.max(0, target.currentHP - damage),
        actionLog: `${attacker.name} uses PhantomKick on ${target.name} for ${damage} damage!`,
        damage,
      };
    },
  },
});

const BressoneEnemies = {
  goblins: (count = 3) =>
    Array(count)
      .fill(null)
      .map((_, i) => createGoblin(i)),

  randomEnemies: (count = 3) => {
    const enemies = [];
    for (let i = 0; i < count; i++) {
      const roll = Math.random() * 100;
      if (roll < 60) {
        enemies.push(createGoblin(i));
      } else if (roll < 85) {
        enemies.push(createOrc(i));
      } else if (roll < 95) {
        enemies.push(createSpriggan(i));
      } else {
        enemies.push(createNightMare(i));
      }
    }
    return enemies;
  },
};

export default BressoneEnemies;
