// BattleManager.js
import React, { useState, useEffect } from "react";
import BattleField from "./Battlefield";
import { useParty } from "../Context/PartyContext";
import {
  fighterSlashAction,
  clericHealingHandsAction,
  archerVolleyAction,
  summonerFamiliarAction,
  mageSpellcastAction,
  rogueBackstabAction,
  fairyPolarityAction,
  vampireDrainAction,
  elementalBurstAction,
  giantSeismicAction,
  werewolfHumanAttackAction,
  werewolfBeastAttackAction,
  heroAction,
} from "./BattleActions";

function BattleManager({ enemies, onBattleEnd }) {
  const { party, setParty } = useParty();

  const [turnOrder, setTurnOrder] = useState([]);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [battleLog, setBattleLog] = useState([]);
  const [players, setPlayers] = useState([]);
  const [enemyState, setEnemyState] = useState([]);
  const [battleOver, setBattleOver] = useState(false);
  const [paused, setPaused] = useState(false);

  // animation state:
  const [animations, setAnimations] = useState([]); // {id, actorId, targetId, type, value, moveName}
  const [activeActorId, setActiveActorId] = useState(null);

  useEffect(() => {
    const mainHero = JSON.parse(localStorage.getItem("finalCharacter"));
    const otherPlayers = party
      .filter((p) => p.name !== mainHero?.Name)
      .map((p) => ({
        ...p,
        currentHP: typeof p.currentHP === "number" ? p.currentHP : p.maxHP,
        id: p.id || `player-${p.name}`,
        Icon: p.Icon,
      }));

    // 2x3 grid: [front-left, front-center(hero), front-right, back-left, back-center, back-right]
    const arrangedPlayers = Array(6).fill(null);

    if (mainHero) {
      arrangedPlayers[1] = {
        ...mainHero,
        id: "player-hero",
        currentHP: mainHero.currentHP ?? mainHero.maxHP,
        Icon: mainHero.Icon,
      };
    }

    let otherIndex = 0;
    for (let i = 0; i < arrangedPlayers.length; i++) {
      if (arrangedPlayers[i] === null && otherPlayers[otherIndex]) {
        arrangedPlayers[i] = {
          ...otherPlayers[otherIndex],
          currentHP:
            otherPlayers[otherIndex].currentHP ??
            otherPlayers[otherIndex].maxHP,
          id: otherPlayers[otherIndex].id || `player-${otherIndex}`,
        };
        otherIndex++;
      }
    }

    const enemySetup = enemies.map((e, index) => ({
      ...e,
      id: e.id ?? `enemy-${index}`,
      currentHP: typeof e.currentHP === "number" ? e.currentHP : e.maxHP,
    }));

    setPlayers(arrangedPlayers);
    setEnemyState(enemySetup);

    const order = [...arrangedPlayers.filter(Boolean), ...enemySetup].sort(
      (a, b) => (b?.Speed ?? 0) - (a?.Speed ?? 0)
    );
    setTurnOrder(order);
    setCurrentTurnIndex(0);
    setBattleOver(false);
    setBattleLog([]);
  }, [party, enemies]);

  useEffect(() => {
    if (battleOver || paused || turnOrder.length === 0) return;

    const currentActor = turnOrder[currentTurnIndex];
    if (!currentActor || (currentActor.currentHP ?? 0) <= 0) {
      proceedToNextTurn();
      return;
    }

    const timer = setTimeout(() => {
      handleAction(currentActor);
    }, 1200);

    return () => clearTimeout(timer);
  }, [currentTurnIndex, turnOrder, battleOver]);

  // helper to enqueue animations and auto-remove them
  const pushAnimations = (anims) => {
    // give unique ids
    const withIds = anims.map((a) => ({
      ...a,
      id: `${Date.now()}-${Math.random()}`,
    }));
    setAnimations((prev) => [...prev, ...withIds]);

    // cleanup after 1100ms
    withIds.forEach((a) => {
      setTimeout(() => {
        setAnimations((prev) => prev.filter((p) => p.id !== a.id));
      }, 1100);
    });
  };

  const handleAction = (actor) => {
    if (!actor) return;

    // highlight attacker briefly
    setActiveActorId(actor.id);
    setTimeout(() => setActiveActorId(null), 900);

    let logs = [];
    let effects = [];

    const livingPlayers = players.filter((p) => p && (p.currentHP ?? 0) > 0);

    switch (actor.role) {
      case "Hero":
        ({ logs, effects } = heroAction(actor, players, enemyState));
        applyEffects(effects, "enemy", actor, logs);
        break;

      case "Fighter":
        ({ logs, effects } = fighterSlashAction(actor, players, enemyState));
        applyEffects(effects, "enemy", actor, logs);
        break;

      case "Cleric":
        ({ logs, effects } = clericHealingHandsAction(
          actor,
          players,
          enemyState
        ));
        applyEffects(effects, "ally", actor, logs);
        break;

      case "Archer":
        ({ logs, effects } = archerVolleyAction(actor, players, enemyState));
        applyEffects(effects, "enemy", actor, logs);
        break;

      case "Summoner":
        ({ logs, effects } = summonerFamiliarAction(
          actor,
          players,
          enemyState
        ));
        applyEffects(effects, "enemy", actor, logs);
        break;

      case "Mage":
        ({ logs, effects } = mageSpellcastAction(actor, players, enemyState));
        applyEffects(effects, "enemy", actor, logs);
        break;

      case "Rogue":
        ({ logs, effects } = rogueBackstabAction(actor, players, enemyState));
        applyEffects(effects, "enemy", actor, logs);
        break;

      case "Fairy":
        ({ logs, effects } = fairyPolarityAction(actor, players, enemyState));
        applyEffects(effects, "both", actor, logs);
        break;

      case "Vampire":
        ({ logs, effects } = vampireDrainAction(actor, players, enemyState));
        applyEffects(effects, "both", actor, logs);
        break;

      case "Elemental":
        ({ logs, effects } = elementalBurstAction(actor, players, enemyState));
        applyEffects(effects, "enemy", actor, logs);
        break;

      case "Giant":
        ({ logs, effects } = giantSeismicAction(actor, players, enemyState));
        applyEffects(effects, "enemy", actor, logs);
        break;

      case "WereWolf":
        if (actor.form === "human") {
          ({ logs, effects } = werewolfHumanAttackAction(
            actor,
            players,
            enemyState
          ));
        } else {
          ({ logs, effects } = werewolfBeastAttackAction(
            actor,
            players,
            enemyState
          ));
        }
        applyEffects(effects, "enemy", actor, logs);
        break;

      // Generic enemy attacks (use each enemy's action.perform)
      case "Goblin":
      case "Orc":
      case "Spriggan":
      case "NightMare": {
        const result = actor.action?.perform?.({
          attacker: actor,
          targets: livingPlayers,
        });
        if (result) {
          // result contains targetId, newHP, actionLog, damage (as earlier)
          setPlayers((prev) =>
            prev.map((p) =>
              p && p.id === result.targetId
                ? { ...p, currentHP: result.newHP }
                : p
            )
          );
          logs.push(result.actionLog || `${actor.action} attacks!`);

          // enqueue a damage animation if result.damage exists
          if (typeof result.damage === "number") {
            pushAnimations([
              {
                actorId: actor.id,
                targetId: result.targetId,
                type: "damage",
                value: result.damage,
                moveName: actor.action?.name || "Attack",
              },
            ]);
          }
        }
        break;
      }
    }

    // append logs, check end, next turn
    if (logs.length) setBattleLog((prev) => [...prev, ...logs]);
    checkBattleEnd();
    proceedToNextTurn();
  };

  /**
   * applyEffects
   * - effects: array of { type: "damage"|"heal", targetId, value, damageType? }
   * - targetType informs which pools to update
   * - actor + logs are used to construct animation metadata (moveName)
   */
  const applyEffects = (
    effects = [],
    targetType = "enemy",
    actor = {},
    logs = []
  ) => {
    let newPlayers = players.slice();
    let newEnemies = enemyState.slice();

    // for each effect, update the appropriate pool and create an animation object
    const animsToPush = [];

    effects.forEach((eff) => {
      if (!eff || !eff.targetId) return;

      const moveName =
        eff.moveName ||
        actor.action?.name ||
        actor.role ||
        (logs[0] ? logs[0].split(" ")[1] : "Move");

      if (eff.type === "damage") {
        // try enemies first then players depending on targetType
        if (targetType === "enemy" || targetType === "both") {
          newEnemies = newEnemies.map((e) =>
            e.id === eff.targetId
              ? {
                  ...e,
                  currentHP: Math.max(
                    0,
                    (typeof e.currentHP === "number" ? e.currentHP : e.maxHP) -
                      eff.value
                  ),
                }
              : e
          );
        }
        if (targetType === "ally" || targetType === "both") {
          newPlayers = newPlayers.map((p) =>
            p && p.id === eff.targetId
              ? {
                  ...p,
                  currentHP: Math.max(
                    0,
                    (typeof p.currentHP === "number" ? p.currentHP : p.maxHP) -
                      eff.value
                  ),
                }
              : p
          );
        }

        animsToPush.push({
          actorId: actor.id,
          targetId: eff.targetId,
          type: "damage",
          value: eff.value,
          moveName,
        });
      } else if (eff.type === "heal") {
        if (targetType === "ally" || targetType === "both") {
          newPlayers = newPlayers.map((p) => {
            if (!p) return p;
            if (p.id !== eff.targetId) return p;
            const maxHP = typeof p.maxHP === "number" ? p.maxHP : p.HP ?? 1;
            const current = typeof p.currentHP === "number" ? p.currentHP : 0;
            return { ...p, currentHP: Math.min(maxHP, current + eff.value) };
          });

          animsToPush.push({
            actorId: actor.id,
            targetId: eff.targetId,
            type: "heal",
            value: eff.value,
            moveName,
          });
        }
        // enemies healing rarely used — support if needed
        if (targetType === "enemy" || targetType === "both") {
          newEnemies = newEnemies.map((e) => {
            if (e.id !== eff.targetId) return e;
            const maxHP = typeof e.maxHP === "number" ? e.maxHP : e.HP ?? 1;
            const current = typeof e.currentHP === "number" ? e.currentHP : 0;
            return { ...e, currentHP: Math.min(maxHP, current + eff.value) };
          });

          animsToPush.push({
            actorId: actor.id,
            targetId: eff.targetId,
            type: "heal",
            value: eff.value,
            moveName,
          });
        }
      }
    });

    // commit updates
    setEnemyState(newEnemies);
    setPlayers(newPlayers);
    // if (paused) return; // Skip updates when paused
    // rebuild turn order with latest values (so dead characters won't act)
    setTurnOrder(syncTurnOrder(newPlayers, newEnemies));

    // enqueue animations (non-blocking)
    if (animsToPush.length) pushAnimations(animsToPush);
  };

  const syncTurnOrder = (playersArr, enemiesArr) => {
    return [...playersArr.filter(Boolean), ...enemiesArr.filter(Boolean)].sort(
      (a, b) => (b?.Speed ?? 0) - (a?.Speed ?? 0)
    );
  };

  const proceedToNextTurn = () => {
    // if (paused) return; // Skip updates when paused
    setCurrentTurnIndex((prev) =>
      prev + 1 >= turnOrder.length ? 0 : prev + 1
    );
  };

  const checkBattleEnd = () => {
    const allEnemiesDead = enemyState.every((e) => (e.currentHP ?? 0) <= 0);
    const allPlayersDead = players
      .filter(Boolean)
      .every((p) => (p.currentHP ?? 0) <= 0);

    if (allEnemiesDead) {
      setBattleLog((prev) => [...prev, "Victory! All enemies defeated."]);
      setBattleOver(true);
      setParty(
        party.map((p) => {
          const player = players.find((pl) => pl?.name === p.name);
          return { ...p, currentHP: player?.currentHP ?? p.maxHP };
        })
      );
      if (onBattleEnd) onBattleEnd(true);
    } else if (allPlayersDead) {
      setBattleLog((prev) => [...prev, "Defeat! Your party has fallen."]);
      setBattleOver(true);
      if (onBattleEnd) onBattleEnd(false);
    }
  };

  return (
    <div className="battle-container">
      <BattleField
        players={players}
        enemies={enemyState}
        animations={animations}
        activeActorId={activeActorId}
      />
      <button onClick={() => setPaused(!paused)}>
        {paused ? "Resume Battle" : "Pause Battle"}
      </button>

      <div className="battle-log">
        {battleLog.slice(-6).map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
}

export default BattleManager;
