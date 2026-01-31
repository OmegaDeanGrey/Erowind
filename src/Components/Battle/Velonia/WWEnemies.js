// BressoneEnemies.js
const createDarkElfKing = () => ({
  id: "DarkElf-king",
  name: "DarkElf King",
  role: "DarkElf King",
  maxHP: 200,
  currentHP: 200,
  strength: 40,
  defense: 25,
  speed: 20,
  experienceYield: 50,
  portrait: "/DarkElfKing.png",
  action: {
    name: "Dark Smash",
    type: "damage",
    power: 40,
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
        actionLog: `${attacker.name} uses Royal Smash on ${target.name} for ${damage} damage!`,
        damage,
      };
    },
  },
});

const createDarkElf = (id = 0) => ({
  id: `DarkElf-${id}`,
  name: `DarkElf ${id + 1}`,
  role: "DarkElf",
  maxHP: 30,
  currentHP: 30,
  strength: 30,
  defense: 20,
  speed: 30,
  experienceYield: 5,
  portrait: "/DarkElfLeader.png",
  action: {
    name: "Undercut",
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

const createWillOWisp = (id = 0) => ({
  id: `WillOWisp-${id}`,
  name: `WillOWisp ${id + 1}`,
  role: "WillOWisp",
  maxHP: 40,
  currentHP: 40,
  strength: 35,
  defense: 30,
  speed: 10,
  experienceYield: 10,
  portrait: "/WillOWisp.png",
  action: {
    name: "Cringe",
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

const createTroll = (id = 0) => ({
  id: `Troll-${id}`,
  name: `Troll ${id + 1}`,
  role: "Troll",
  maxHP: 40,
  currentHP: 40,
  strength: 25,
  defense: 20,
  speed: 60,
  experienceYield: 10,
  portrait: "/Troll.png",
  action: {
    name: "Club",
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

const createPoltergeist = (id = 0) => ({
  id: `Poltergeist-${id}`,
  name: `Poltergeist ${id + 1}`,
  role: "Poltergeist",
  maxHP: 50,
  currentHP: 50,
  strength: 35,
  defense: 40,
  speed: 40,
  experienceYield: 20,
  portrait: "/Poltergeist.png",
  action: {
    name: "Dark Magic",
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

const WWEnemies = {
  DarkElfs: (count = 3) =>
    Array(count)
      .fill(null)
      .map((_, i) => createDarkElf(i)),
  DarkElfKing: createDarkElfKing,
  randomEnemies: (count = 3) => {
    const enemies = [];
    for (let i = 0; i < count; i++) {
      const roll = Math.random() * 100;
      if (roll < 60) {
        enemies.push(createDarkElf(i));
      } else if (roll < 85) {
        enemies.push(createWillOWisp(i));
      } else if (roll < 95) {
        enemies.push(createTroll(i));
      } else {
        enemies.push(createPoltergeist(i));
      }
    }
    return enemies;
  },
};

export default WWEnemies;
