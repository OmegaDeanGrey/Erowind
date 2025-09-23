import React, { useState } from "react";
import BressoneEnemies from "../Velonia/BressoneEnemies";
import BattleManager from "../BattleManager";
import { useNavigate } from "react-router-dom";
import "../Battle.css";
import DialogBox from "../../Utility/DialogBox";

function BressoneBattle() {
  const [enemies, setEnemies] = useState([]);
  const [phase, setPhase] = useState("dialog1"); // dialog1 -> dialog2 -> battleIntro -> transition -> battle -> complete
  const [dialogIndex, setDialogIndex] = useState(0);
  const [dialogIndex2, setDialogIndex2] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [battleResult, setBattleResult] = useState(null);
  const navigate = useNavigate();
  const heroData = JSON.parse(localStorage.getItem("finalCharacter"));
  const mainName = heroData?.Name || "Hero";

  const dialogue1 = [
    {
      text: "The winds outside Bressone carry whispers of danger...",
      name: "Narrator",
    },
    {
      text: "A group of monsters lurks beyond the city walls.",
      name: "Narrator",
    },
    {
      text: "Your party steels themselves for the coming fight.",
      name: "Narrator",
    },
    {
      text: "You are too puny to defeat us!",
      name: "Monster",
      portrait: "/GoblinLeader.png",
    },
    { text: "Prepare for battle!", name: mainName, portrait: "/Hero.png" },
  ];

  const dialogue2 = [
    { text: "Outside the town walls...", name: mainName },
    { text: "We shall defend our home...", name: mainName },
    {
      text: "You are too puny to defeat us!",
      name: "Monster",
      portrait: "/GoblinLeader.png",
    },
  ];

  const nextDialog1 = () => {
    if (dialogIndex < dialogue1.length - 1) {
      setDialogIndex(dialogIndex + 1);
    } else {
      setPhase("dialog2");
    }
  };

  const nextDialog2 = () => {
    if (dialogIndex2 < dialogue2.length - 1) {
      setDialogIndex2(dialogIndex2 + 1);
    } else {
      prepareBattle();
    }
  };

  // Step before transition → show battle intro screen
  const prepareBattle = () => {
    const generatedEnemies = BressoneEnemies.randomEnemies(3);
    setEnemies(generatedEnemies);
    setPhase("battleIntro");
  };

  const startBattle = () => {
    setTransitioning(true);
    setTimeout(() => {
      setPhase("battle");
      setTransitioning(false);
    }, 800);
  };

  const returnToTown = () => navigate("/Bressone");

  const BressoneBattleComplete = (didWin) => {
    setBattleResult(didWin ? "victory" : "defeat");
    setPhase("complete");
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

      {/* Battle Intro Screen */}
      {phase === "battleIntro" && !transitioning && (
        <div className="battle-intro-modal">
          <h2>⚔️ Battle Incoming!</h2>
          <p>
            <strong>Your Party:</strong>
          </p>
          <ul>
            {/* Pull party data later; for now just hero */}
            <li>{mainName}</li>
          </ul>
          <p>
            <strong>Enemies:</strong>
          </p>
          <ul>
            {enemies.map((enemy, i) => (
              <li key={i}>
                {enemy.name} (HP: {enemy.HP})
              </li>
            ))}
          </ul>
          <p className="disclaimer">
            ⚠️ The battle is automatic. If you want to adjust your team or use
            items, do so now before continuing.
          </p>
          <button onClick={startBattle}>Begin Battle</button>
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
          <button onClick={returnToTown} id="bbreturn">
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
            <button onClick={returnToTown}>Return to Town</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BressoneBattle;
