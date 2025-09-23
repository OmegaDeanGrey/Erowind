//HERO ACTION
export function heroAction(user, allies, enemies) {
  const logs = [];
  const effects = [];

  // Separate front and back row enemies
  const frontRowEnemies = enemies.filter(
    (enemy, index) => index < 3 && enemy.currentHP > 0
  );
  const backRowEnemies = enemies.filter(
    (enemy, index) => index >= 3 && enemy.currentHP > 0
  );

  let target = null;

  if (frontRowEnemies.length > 0) {
    target =
      frontRowEnemies[Math.floor(Math.random() * frontRowEnemies.length)];
  } else if (backRowEnemies.length > 0) {
    target = backRowEnemies[Math.floor(Math.random() * backRowEnemies.length)];
  }

  if (target) {
    // Physical damage: user.strength - target.defense
    const rawDamage = user.strength - target.defense;
    const damage = Math.max(1, rawDamage); // At least 1 damage

    logs.push(
      `${user.name} uses Slash on ${target.name} for ${damage} damage!`
    );

    effects.push({
      type: "damage",
      targetId: target.id,
      value: damage,
    });
  } else {
    logs.push(`${user.name} tried to Slash, but there were no valid targets!`);
  }

  return { logs, effects };
}

// FIGHTER ACTION
export function fighterSlashAction(user, allies, enemies) {
  const logs = [];
  const effects = [];

  // Separate front and back row enemies
  const frontRowEnemies = enemies.filter(
    (enemy, index) => index < 3 && enemy.currentHP > 0
  );
  const backRowEnemies = enemies.filter(
    (enemy, index) => index >= 3 && enemy.currentHP > 0
  );

  let target = null;

  if (frontRowEnemies.length > 0) {
    target =
      frontRowEnemies[Math.floor(Math.random() * frontRowEnemies.length)];
  } else if (backRowEnemies.length > 0) {
    target = backRowEnemies[Math.floor(Math.random() * backRowEnemies.length)];
  }

  if (target) {
    // Physical damage: user.strength - target.defense
    const rawDamage = (user.strength - target.defense) / 2;
    const damage = Math.max(1, rawDamage); // At least 1 damage

    logs.push(
      `${user.name} uses Slash on ${target.name} for ${damage} damage!`
    );

    effects.push({
      type: "damage",
      targetId: target.id,
      value: damage,
    });
  } else {
    logs.push(`${user.name} tried to Slash, but there were no valid targets!`);
  }

  return { logs, effects };
}

// CLERIC ACTION
export function clericHealingHandsAction(user, allies, enemies) {
  const logs = [];
  const effects = [];

  // Filter wounded allies
  const woundedAllies = allies.filter(
    (ally) => ally && (ally.currentHP ?? ally.HP) < (ally.maxHP ?? ally.HP)
  );

  if (woundedAllies.length === 0) {
    // No healing needed — attack like a Fighter
    const frontRowEnemies = enemies.filter(
      (enemy, index) => enemy && index < 3 && enemy.currentHP > 0
    );
    const backRowEnemies = enemies.filter(
      (enemy, index) => enemy && index >= 3 && enemy.currentHP > 0
    );

    let target = frontRowEnemies.length
      ? frontRowEnemies[Math.floor(Math.random() * frontRowEnemies.length)]
      : backRowEnemies[Math.floor(Math.random() * backRowEnemies.length)];

    if (target) {
      const damage = Math.max(1, (user.strength - (target.defense ?? 0)) / 2);
      logs.push(
        `${user.name} swings their mace at ${target.name} for ${damage} damage!`
      );
      effects.push({
        type: "damage",
        targetId: target.id,
        value: damage,
        damageType: "physical",
      });
    } else {
      logs.push(`${user.name} wanted to attack, but there are no targets!`);
    }

    return { logs, effects };
  }

  // Heal the ally with the lowest current HP
  const target = woundedAllies.reduce((lowest, ally) => {
    const allyCurrent = ally.currentHP ?? 0;
    const lowestCurrent = lowest.currentHP ?? 0;
    return allyCurrent < lowestCurrent ? ally : lowest;
  }, woundedAllies[0]);

  const maxHP = target.maxHP ?? target.HP ?? 1;
  const currentHP = target.currentHP ?? 0;
  const healAmount = Math.min(user.intelligence / 2, maxHP - currentHP);

  if (healAmount > 0) {
    logs.push(
      `${user.name} uses Healing Hands on ${target.name}, restoring ${healAmount} HP!`
    );

    effects.push({
      type: "heal",
      targetId: target.id,
      value: healAmount,
    });
  } else {
    logs.push(
      `${user.name} tried to heal ${target.name}, but they are at full HP!`
    );
  }

  return { logs, effects };
}

// ARCHER ACTION (prioritize back row enemies)
export function archerVolleyAction(user, allies, enemies) {
  const logs = [];
  const effects = [];

  // Filter back row enemies first (index 3 and up)
  const backRowEnemies = enemies.filter(
    (enemy, index) => index >= 3 && enemy.currentHP > 0
  );
  // Filter front row enemies if back row is empty
  const frontRowEnemies = enemies.filter(
    (enemy, index) => index < 3 && enemy.currentHP > 0
  );

  let validTargets =
    backRowEnemies.length > 0 ? backRowEnemies : frontRowEnemies;

  if (validTargets.length === 0) {
    logs.push(`${user.name} fires a Volley, but there are no enemies left!`);
    return { logs, effects };
  }

  const target = validTargets[Math.floor(Math.random() * validTargets.length)];
  const baseDamage = Math.floor(user.strength * 0.7) - target.defense;
  const damage = Math.max(1, baseDamage);

  logs.push(
    `${user.name} fires a Volley at ${target.name} for ${damage} damage!`
  );
  effects.push({ type: "damage", targetId: target.id, value: damage });

  return { logs, effects };
}

// SUMMONER ACTION
export function summonerFamiliarAction(user, allies, enemies) {
  const logs = [];
  const effects = [];

  const validTargets = enemies.filter((e) => e.currentHP > 0);
  if (validTargets.length === 0) {
    logs.push(`${user.name} summons Familiar, but there are no enemies left!`);
    return { logs, effects };
  }

  // Summoner attacks multiple random enemies (e.g., 1 to 3 random enemies)
  const numTargets = Math.min(
    Math.floor(Math.random() * 3) + 1,
    validTargets.length
  );

  const targets = [];
  const chosenIndices = new Set();

  while (targets.length < numTargets) {
    const idx = Math.floor(Math.random() * validTargets.length);
    if (!chosenIndices.has(idx)) {
      chosenIndices.add(idx);
      targets.push(validTargets[idx]);
    }
  }

  const damagePerTarget = Math.max(1, Math.floor(user.intelligence * 0.6));

  logs.push(`${user.name} summons a Familiar to attack ${numTargets} enemies!`);

  targets.forEach((target) => {
    logs.push(`${target.name} takes ${damagePerTarget} damage!`);
    effects.push({
      type: "damage",
      targetId: target.id,
      value: damagePerTarget,
      damageType: "magic",
    });
  });

  return { logs, effects };
}

// MAGE ACTION
export function mageSpellcastAction(user, allies, enemies) {
  const logs = [];
  const effects = [];

  // All alive enemies (any row)
  const validTargets = enemies.filter((enemy) => enemy.currentHP > 0);

  if (validTargets.length === 0) {
    logs.push(
      `${user.name} tried to cast a spell, but there are no enemies left!`
    );
    return { logs, effects };
  }

  // Pick a random enemy target from any row
  const target = validTargets[Math.floor(Math.random() * validTargets.length)];

  // Calculate magic damage: based on user's intelligence minus target's defense
  const rawDamage = user.intelligence - target.defense;
  const damage = Math.max(1, Math.floor(rawDamage)); // At least 1 damage

  logs.push(
    `${user.name} casts Spellcast on ${target.name}, dealing ${damage} magic damage!`
  );

  effects.push({
    type: "damage",
    targetId: target.id,
    value: damage,
    damageType: "magic",
  });

  return { logs, effects };
}

// ROGUE ACTION
export function rogueBackstabAction(user, allies, enemies) {
  const logs = [];
  const effects = [];

  const validTargets = enemies.filter((enemy) => enemy.currentHP > 0);

  if (validTargets.length === 0) {
    logs.push(`${user.name} attempts a BackStab, but there are no enemies!`);
    return { logs, effects };
  }

  const target = validTargets[Math.floor(Math.random() * validTargets.length)];

  // Critical chance (e.g., 30%)
  const critChance = 0.3;
  const isCrit = Math.random() < critChance;

  // Damage calculation
  const baseDamage = (user.strength - target.defense) / 2;
  const rawDamage = isCrit ? baseDamage * 2 : baseDamage;
  const damage = Math.max(1, Math.floor(rawDamage)); // Always at least 1

  if (isCrit) {
    logs.push(
      `${user.name} performs a CRITICAL BackStab on ${target.name} for ${damage} damage!`
    );
  } else {
    logs.push(
      `${user.name} uses BackStab on ${target.name} for ${damage} damage.`
    );
  }

  effects.push({
    type: "damage",
    targetId: target.id,
    value: damage,
    damageType: "physical",
  });

  return { logs, effects };
}

//FAIRY ACTION

export function fairyPolarityAction(actor, players, enemies) {
  const logs = [];
  const effects = [];

  const healingAmount =
    Math.floor(actor.intelligence * 0.6) + Math.floor(Math.random() * 5);
  const damageAmount =
    Math.floor(actor.intelligence * 0.5) + Math.floor(Math.random() * 5);

  // Heal one random living ally
  const livingAllies = players.filter((p) => p.currentHP > 0);
  if (livingAllies.length > 0) {
    const targetAlly =
      livingAllies[Math.floor(Math.random() * livingAllies.length)];
    effects.push({
      type: "heal",
      targetId: targetAlly.id,
      value: healingAmount,
    });
    logs.push(
      `${actor.name} heals ${targetAlly.name} for ${healingAmount} HP!`
    );
  }

  // Damage one random living enemy
  const livingEnemies = enemies.filter((e) => e.currentHP > 0);
  if (livingEnemies.length > 0) {
    const targetEnemy =
      livingEnemies[Math.floor(Math.random() * livingEnemies.length)];
    effects.push({
      type: "damage",
      targetId: targetEnemy.id,
      value: damageAmount,
    });
    logs.push(
      `${actor.name} zaps ${targetEnemy.name} for ${damageAmount} damage!`
    );
  }

  return { logs, effects };
}

// VAMP ACTION

export function vampireDrainAction(actor, players, enemies) {
  const logs = [];
  const effects = [];

  // Target a random alive enemy
  const livingEnemies = enemies.filter((e) => e.currentHP > 0);
  if (livingEnemies.length === 0) return { logs, effects };

  const target =
    livingEnemies[Math.floor(Math.random() * livingEnemies.length)];

  // Damage calculation
  const damage =
    Math.floor(actor.strength * 0.9) + Math.floor(Math.random() * 6); // Slight randomness
  const healing = Math.floor(damage / 2);

  // Apply damage to enemy
  effects.push({
    type: "damage",
    targetId: target.id,
    value: damage,
  });
  logs.push(`${actor.name} drains ${damage} HP from ${target.name}!`);

  // Heal self
  effects.push({
    type: "heal",
    targetId: actor.id,
    value: healing,
  });
  logs.push(`${actor.name} restores ${healing} HP!`);

  return { logs, effects };
}

//ELEMENTAL ACTION
export function elementalBurstAction(user, allies, enemies) {
  const logs = [];
  const effects = [];

  const livingEnemies = enemies.filter((e) => e.currentHP > 0);
  if (livingEnemies.length === 0) {
    logs.push(`${user.name} channels the elements, but there are no enemies!`);
    return { logs, effects };
  }

  // Pick a random element (0 to 3)
  const elementalChoice = Math.floor(Math.random() * 4);

  // Pick random target
  const target =
    livingEnemies[Math.floor(Math.random() * livingEnemies.length)];

  // Define elemental variants
  const elements = [
    {
      name: "Flame Burst",
      multiplier: 1.3,
      type: "fire",
    },
    {
      name: "Tidal Surge",
      multiplier: 1.6,
      type: "water",
    },
    {
      name: "Gale Slash",
      multiplier: 1.1,
      type: "air",
    },
    {
      name: "Quake Spike",
      multiplier: 1.4,
      type: "earth",
    },
  ];

  const chosen = elements[elementalChoice];

  // Damage is based on intelligence
  const baseDamage =
    Math.floor(user.intelligence * chosen.multiplier) - target.defense;
  const damage = Math.max(1, baseDamage);

  logs.push(
    `${user.name} unleashes ${chosen.name} on ${target.name}, dealing ${damage} ${chosen.type} damage!`
  );

  effects.push({
    type: "damage",
    targetId: target.id,
    value: damage,
    damageType: chosen.type,
  });

  return { logs, effects };
}

//GIANT ACTION
export function giantSeismicAction(user, allies, enemies) {
  const logs = [];
  const effects = [];

  const frontRowEnemies = enemies.filter(
    (_, index) => index < 3 && _.currentHP > 0
  );
  const backRowEnemies = enemies.filter(
    (_, index) => index >= 3 && _.currentHP > 0
  );
  const frontRowAllies = allies.filter(
    (_, index) => index < 3 && _.currentHP > 0
  );

  const outcome = Math.floor(Math.random() * 4); // 0–3
  const damage = Math.floor(Math.random() * 6) + 5; // Low damage, 5–10

  if (frontRowEnemies.length + backRowEnemies.length === 0 && outcome !== 3) {
    logs.push(
      `${user.name} tries to shake the ground, but there are no enemies!`
    );
    return { logs, effects };
  }

  switch (outcome) {
    case 0: // Damage all enemies
      logs.push(`${user.name} stomps the ground! A quake strikes all enemies!`);
      enemies.forEach((enemy) => {
        if (enemy.currentHP > 0) {
          effects.push({
            type: "damage",
            targetId: enemy.id,
            value: damage,
            damageType: "physical",
          });
          logs.push(`${enemy.name} takes ${damage} damage!`);
        }
      });
      break;

    case 1: // Damage front row enemies only
      logs.push(`${user.name} targets the front line with a violent tremor!`);
      frontRowEnemies.forEach((enemy) => {
        effects.push({
          type: "damage",
          targetId: enemy.id,
          value: damage,
          damageType: "physical",
        });
        logs.push(`${enemy.name} is rocked for ${damage} damage!`);
      });
      break;

    case 2: // Damage front row of both teams
      logs.push(`${user.name} causes tremors across the battlefield!`);
      frontRowEnemies.forEach((enemy) => {
        effects.push({
          type: "damage",
          targetId: enemy.id,
          value: damage,
          damageType: "physical",
        });
        logs.push(`${enemy.name} is hit for ${damage} damage!`);
      });
      frontRowAllies.forEach((ally) => {
        effects.push({
          type: "damage",
          targetId: ally.id,
          value: damage,
          damageType: "physical",
        });
        logs.push(
          `${ally.name} is caught in the quake and takes ${damage} damage!`
        );
      });
      break;

    case 3: // No damage, just flavor
      logs.push(
        `${user.name} slams the ground but pauses... gathering strength!`
      );
      break;
  }

  return { logs, effects };
}

//WEREWOLF ACTION
// Human-form WereWolf attack — simple melee slash
export const werewolfHumanAttackAction = (actor, players, enemies) => {
  let logs = [];
  let effects = [];

  // Pick a random living enemy
  const livingEnemies = enemies.filter((e) => e.currentHP > 0);
  if (livingEnemies.length === 0) {
    logs.push(`${actor.name} has no enemies to attack!`);
    return { logs, effects };
  }

  const target =
    livingEnemies[Math.floor(Math.random() * livingEnemies.length)];

  // Damage calculation
  const damage = Math.max(1, actor.strength - target.defense);
  logs.push(`${actor.name} slashes at ${target.name} for ${damage} damage!`);

  effects.push({
    targetId: target.id,
    type: "damage",
    value: damage,
  });

  return { logs, effects };
};

// Beast-form WereWolf attack — stronger, maybe a double-hit
export const werewolfBeastAttackAction = (actor, players, enemies) => {
  let logs = [];
  let effects = [];

  const livingEnemies = enemies.filter((e) => e.currentHP > 0);
  if (livingEnemies.length === 0) {
    logs.push(`${actor.name} has no enemies to attack!`);
    return { logs, effects };
  }

  const target =
    livingEnemies[Math.floor(Math.random() * livingEnemies.length)];

  // More aggressive damage calculation
  const damage1 = Math.max(1, actor.strength + 5 - target.defense);
  const damage2 = Math.max(1, actor.strength + 5 - target.defense);

  logs.push(
    `${actor.name} ferociously mauls ${target.name} for ${damage1} damage!`
  );
  logs.push(
    `${actor.name} bites ${target.name} for an additional ${damage2} damage!`
  );

  effects.push({
    targetId: target.id,
    type: "damage",
    value: damage1,
  });

  effects.push({
    targetId: target.id,
    type: "damage",
    value: damage2,
  });

  return { logs, effects };
};
