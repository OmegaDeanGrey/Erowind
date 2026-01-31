// BressoneEnemies.js
const createGiantSpider = () => ({
  id: "Spider-king",
  name: "GiantSpider",
  role: "GiantSpider",
  maxHP: 200,
  currentHP: 200,
  strength: 40,
  defense: 25,
  speed: 20,
  experienceYield: 50,
  portrait: "/GiantSpider.png",
  action: {
    name: "Fangs",
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
        actionLog: `${attacker.name} uses Fangs on ${target.name} for ${damage} damage!`,
        damage,
      };
    },
  },
});

const createSpider = (id = 0) => ({
  id: `Spider-${id}`,
  name: `Spider ${id + 1}`,
  role: "Spider",
  maxHP: 30,
  currentHP: 30,
  strength: 30,
  defense: 20,
  speed: 30,
  experienceYield: 5,
  portrait: "/Spider.png",
  action: {
    name: "Strike",
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

const createGnome = (id = 0) => ({
  id: `Gnome-${id}`,
  name: `Gnome ${id + 1}`,
  role: "Gnome",
  maxHP: 40,
  currentHP: 40,
  strength: 35,
  defense: 30,
  speed: 10,
  experienceYield: 10,
  portrait: "/Gnome.png",
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

const createGoblinSoldier = (id = 0) => ({
  id: `GoblinSoldier-${id}`,
  name: `GoblinSoldier ${id + 1}`,
  role: "GoblinSoldier",
  maxHP: 40,
  currentHP: 40,
  strength: 25,
  defense: 20,
  speed: 60,
  experienceYield: 10,
  portrait: "/GoblinSoldier.png",
  action: {
    name: "Spear",
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

const createBalrog = (id = 0) => ({
  id: `Balrog-${id}`,
  name: `Balrog ${id + 1}`,
  role: "Balrog",
  maxHP: 50,
  currentHP: 50,
  strength: 35,
  defense: 40,
  speed: 40,
  experienceYield: 20,
  portrait: "/Balrog.png",
  action: {
    name: "Hades",
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

const DvasheldEnemies = {
  Spiders: (count = 3) =>
    Array(count)
      .fill(null)
      .map((_, i) => createSpider(i)),
  GiantSpider: createGiantSpider,
  randomEnemies: (count = 3) => {
    const enemies = [];
    for (let i = 0; i < count; i++) {
      const roll = Math.random() * 100;
      if (roll < 60) {
        enemies.push(createSpider(i));
      } else if (roll < 85) {
        enemies.push(createGnome(i));
      } else if (roll < 95) {
        enemies.push(createGoblinSoldier(i));
      } else {
        enemies.push(createBalrog(i));
      }
    }
    return enemies;
  },
};

export default DvasheldEnemies;
