import React, { useState } from "react";
import BressoneEnemies from "../Velonia/BressoneEnemies";
import BressoneSpoils from "./BressoneSpoils";
import BattleManager from "../BattleManager";
import { useNavigate } from "react-router-dom";
import "../Battle.css";
import DialogBox from "../../Utility/DialogBox";
import { useParty } from "../../Context/PartyContext";

function BressoneBattle() {
  const [enemies, setEnemies] = useState([]);
  const [phase, setPhase] = useState("dialog1"); // dialog1 -> dialog2 -> battleIntro -> transition -> battle -> dialog3 -> complete
  const [dialogIndex, setDialogIndex] = useState(0);
  const [dialogIndex2, setDialogIndex2] = useState(0);
  const [dialogIndex3, setDialogIndex3] = useState(0);

  const [transitioning, setTransitioning] = useState(false);
  const [battleResult, setBattleResult] = useState(null);
  const navigate = useNavigate();

  const heroData = JSON.parse(localStorage.getItem("finalCharacter"));
  const mainName = heroData?.Name || "Hero";
  const { party } = useParty();

  const firstBattleDone =
    JSON.parse(localStorage.getItem("bressoneFirstBattleDone")) || false;

  // ---- Dialogues ----
  const dialogue1 = !firstBattleDone
    ? [
        {
          text: "The Goblin King awaits your challenge!",
          name: "Ahn DaQuin",
          portrait: "/DwarfKing.png",
        },
        {
          text: "Your party steels themselves for the fight of their lives.",
          name: "Narrator",
        },
        {
          text: "You are too puny to defeat us!",
          name: "O Hra",
          portrait: "/GoblinKing.png",
        },
        { text: "Prepare for battle!", name: mainName, portrait: "/Hero.png" },
      ]
    : [
        {
          text: "The winds outside Bressone carry whispers of danger...",
          name: "Narrator",
        },
        {
          text: "A group of monsters lurks beyond the city walls.",
          name: "Narrator",
        },
      ];

  const dialogue2 = [
    { text: "Outside the town walls...", name: mainName },
    { text: "We shall defend our home...", name: mainName },
    {
      text: "Darkess will triumph!",
      name: "O Hra",
      portrait: "/GoblinKing.png",
    },
  ];

  const dialogue3 = [
    { text: "You have defeated the Goblin King!", name: mainName },
    {
      text: "The Goblin King Crown is now yours.",
      name: "Ahn DaQuin",
      image: "/GKC.png",
    },
    { text: "Our city is safe thanks to you!", name: mainName },
  ];

  // ---- Dialogue Navigation ----
  const nextDialog1 = () => {
    if (dialogIndex < dialogue1.length - 1) {
      setDialogIndex(dialogIndex + 1);
    } else {
      if (firstBattleDone) {
        // Skip straight to battle for subsequent fights
        prepareBattle();
      } else {
        setPhase("dialog2");
      }
    }
  };

  const nextDialog2 = () => {
    if (dialogIndex2 < dialogue2.length - 1) {
      setDialogIndex2(dialogIndex2 + 1);
    } else {
      prepareBattle();
    }
  };

  const nextDialog3 = () => {
    if (dialogIndex3 < dialogue3.length - 1) {
      setDialogIndex3(dialogIndex3 + 1);
    } else {
      setPhase("complete");
    }
  };

  // ---- Battle Preparation ----
  const prepareBattle = () => {
    let generatedEnemies;

    if (!firstBattleDone) {
      // Special first battle
      generatedEnemies = [
        BressoneEnemies.goblinKing(),
        ...BressoneEnemies.goblins(5), // 5 goblins
      ];
    } else {
      // Regular random battle
      generatedEnemies = BressoneEnemies.randomEnemies(3);
    }

    setEnemies(generatedEnemies);
    setPhase("battleIntro");
  };

  // ---- Start Battle ----
  const startBattle = () => {
    setTransitioning(true);
    setTimeout(() => {
      setPhase("battle");
      setTransitioning(false);
    }, 800);
  };

  const returnToTown = () => navigate("/Bressone");

  // ---- Battle Completion ----
  const BressoneBattleComplete = (didWin) => {
    setBattleResult(didWin ? "victory" : "defeat");

    if (!firstBattleDone && didWin) {
      localStorage.setItem("bressoneFirstBattleDone", true);
      localStorage.setItem(
        "goblinKingCrown",
        JSON.stringify({
          name: "Goblin King’s Crown",
          description:
            "A heavy crown that once belonged to the goblin monarch.",
          image: "/GKC.png",
        })
      );

      // Move to dialogue3 after first battle
      setPhase("dialog3");
      setDialogIndex2(0);
    } else {
      setPhase("complete");
    }
  };

  return (
    <div>
      {/* Dialog 1 */}
      {phase === "dialog1" && !transitioning && (
        <div className="bressone-battle-container">
          <DialogBox
            {...dialogue1[dialogIndex]}
            onNext={nextDialog1}
            isLast={dialogIndex === dialogue1.length - 1}
          />
        </div>
      )}

      {/* Dialog 2 */}
      {phase === "dialog2" && !transitioning && (
        <div className="bressone-battle-container2">
          <DialogBox
            {...dialogue2[dialogIndex2]}
            onNext={nextDialog2}
            isLast={dialogIndex2 === dialogue2.length - 1}
          />
        </div>
      )}

      {/* Dialog 3 (After first battle) */}
      {phase === "dialog3" && !transitioning && (
        <div className="bressone-battle-container2">
          <DialogBox
            {...dialogue3[dialogIndex3]}
            onNext={nextDialog3}
            isLast={dialogIndex2 === dialogue3.length - 1}
          />
        </div>
      )}

      {/* Battle Intro Screen */}
      <div className="introbg">
        {phase === "battleIntro" && !transitioning && (
          <div className="battle-intro-modal">
            <h2>⚔️ Battle Incoming!</h2>
            <p>
              <strong>Your Party:</strong>
            </p>
            <ul>
              <li>{mainName}</li>
              {party.map((member, i) => (
                <li key={i}>
                  {member.name || member.Name} (HP:{" "}
                  {member.currentHP ?? member.maxHP})
                </li>
              ))}
            </ul>

            <p>
              <strong>Enemies:</strong>
            </p>
            <ul>
              {enemies.map((enemy, i) => (
                <li key={i}>
                  {enemy.name} (HP: {enemy.HP || enemy.maxHP})
                </li>
              ))}
            </ul>
            <p className="disclaimer">
              ⚠️ The battle is automatic. If you want to adjust your team or use
              items, do so now before continuing.
            </p>
            <button className="battlebuttons" onClick={startBattle}>
              Begin Battle
            </button>
            <button onClick={returnToTown}>Return to Town</button>
          </div>
        )}

        {/* Transition overlay */}
        {transitioning && <div className="battle-transition"></div>}

        {/* Battlefield */}
        {phase === "battle" && !transitioning && (
          <div className="battlefield">
            <h1 id="BBTitle">Bressone Outskirts</h1>
            <BattleManager
              enemies={enemies}
              onBattleEnd={BressoneBattleComplete}
            />
            <button onClick={returnToTown} classname="bbreturn">
              Return to Town
            </button>
          </div>
        )}

        {/* Battle Complete Modal */}
        {phase === "complete" && (
          <div id="resultscreen">
            <div className="battle-complete-modal">
              <h2>
                {battleResult === "victory" ? "🎉 Victory!" : "☠️ Defeat..."}
              </h2>
              <p>
                {battleResult === "victory"
                  ? "All enemies have been defeated. Your party stands triumphant!"
                  : "Your party has fallen... Darkness closes in."}
              </p>

              <button className="battlebuttons" onClick={returnToTown}>
                Return to Town
              </button>
              <div className="spoils">
                <BressoneSpoils />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BressoneBattle;
