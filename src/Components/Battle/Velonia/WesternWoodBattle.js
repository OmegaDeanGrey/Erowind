import React, { useState, useEffect } from "react";
import WWEnemies from "../Velonia/WWEnemies";
import BattleManager from "../BattleManager";
import { useNavigate } from "react-router-dom";
import "../Battle.css";
import "../../Utility/Animations.css";
import DialogBox from "../../Utility/DialogBox";
import { useParty } from "../../Context/PartyContext.js";

function WesternWoodBattle() {
  const [enemies, setEnemies] = useState([]);
  const [phase, setPhase] = useState("dialog1"); // dialog1 -> dialog2 -> battleIntro -> transition -> battle -> dialog3 -> complete
  const [dialogIndex, setDialogIndex] = useState(0);
  const [dialogIndex2, setDialogIndex2] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [battleResult, setBattleResult] = useState(null);
  const [showArrow, setShowArrow] = useState(false);
  const navigate = useNavigate();
  const { setMap2Trigger } = useParty();

  const heroData = JSON.parse(localStorage.getItem("finalCharacter"));
  const mainName = heroData?.Name || "Hero";

  const westernWoodFirstBattleDone =
    JSON.parse(localStorage.getItem("westernWoodFirstBattleDone")) || false;

  //   useEffect(() => {
  //     if (
  //       phase === "dialog2" &&
  //       dialogue2[dialogIndex2]?.text.includes("Arrow")
  //     ) {
  //       setShowArrow(true);

  //       const timer = setTimeout(() => setShowArrow(false), 600); // faster
  //       return () => clearTimeout(timer);
  //     }
  //   }, [phase, dialogIndex2]); // ✅ use dialogIndex2, not dialogIndex

  // ---- Dialogues ----
  const dialogue1 = !westernWoodFirstBattleDone
    ? [
        {
          text: "...please aid us Hero!",
          name: "NiVei",
          portrait: "/NiVei.png",
        },
        {
          text: "We must help them fellows!",
          name: mainName,
          portrait: "/Hero.png",
        },
      ]
    : [
        {
          text: "An Arrow wizzes by your heads..",
          name: "Voice",
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
          text: "We will avenge our king!",
          name: "Goblin",
          portrait: "/GoblinLeader.png",
        },
        { text: "Prepare for battle!", name: mainName, portrait: "/Hero.png" },
      ];

  const dialogue2 = [
    { text: "An Arrow wizzes by your heads...", name: "Voice" },
    {
      text: "We shall defend them...",
      name: mainName,
      portrait: "/Hero.png",
    },
  ];

  const dialogue3 = [
    { text: "You have defeated the Goblin King!", name: mainName },
    { text: "The Goblin King Crown is now yours.", name: "Narrator" },
    { text: "Our city is safe thanks to you!", name: mainName },
  ];

  // ---- Dialogue Navigation ----
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

      // 👇 Check if THIS line has "Arrow" when pressing Next
      if (dialogue2[dialogIndex2 + 1]?.text.includes("Arrow")) {
        setShowArrow(true);

        setTimeout(() => setShowArrow(false), 1200);
      }
    } else {
      prepareBattle();
    }
  };

  const nextDialog3 = () => {
    if (dialogIndex2 < dialogue3.length - 1) {
      setDialogIndex2(dialogIndex2 + 1);
    } else {
      setPhase("complete");
    }
  };

  // ---- Battle Preparation ----
  const prepareBattle = () => {
    let generatedEnemies;

    if (!westernWoodFirstBattleDone) {
      // Special first battle
      generatedEnemies = [
        WWEnemies.goblinKing(),
        ...WWEnemies.goblins(5), // 5 goblins
      ];
    } else {
      // Regular random battle
      generatedEnemies = WWEnemies.randomEnemies(3);
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

  const returnToTown = () => navigate("/WesternWood");

  // ---- Battle Completion ----
  const WesternWoodBattleComplete = (didWin) => {
    setBattleResult(didWin ? "victory" : "defeat");

    if (!westernWoodFirstBattleDone && didWin) {
      localStorage.setItem("westernWoodFirstBattleDone", true);
      localStorage.setItem(
        "elvenEmblem",
        JSON.stringify({
          name: "Elven Emblem",
          desciption: "Elven Insignia",
          image: "/ElvenEmblem",
          type: "key item",
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
        <div id="WWDialog1">
          <DialogBox
            {...dialogue1[dialogIndex]}
            onNext={nextDialog1}
            isLast={dialogIndex === dialogue1.length - 1}
          />
        </div>
      )}

      {/* Dialog 2 */}
      {phase === "dialog2" && !transitioning && (
        <div id="WWDialog2">
          <div style={{ position: "relative", overflow: "hidden" }}>
            {/* existing code */}

            {showArrow && (
              <img src="/arrow.png" alt="arrow" className="arrow" />
            )}
          </div>
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
            {...dialogue3[dialogIndex2]}
            onNext={nextDialog3}
            isLast={dialogIndex2 === dialogue3.length - 1}
          />
        </div>
      )}
      {/* <div className="introbg"> */}
      {/* Battle Intro Screen */}
      {phase === "battleIntro" && !transitioning && (
        <div className="battle-intro-modal">
          <h2>⚔️ Battle Incoming!</h2>
          <p>
            <strong>Your Party:</strong>
          </p>
          <ul>
            <li>{mainName}</li>
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
          <button onClick={startBattle}>Begin Battle</button>
          <button onClick={returnToTown}>Return to Town</button>
        </div>
      )}

      {/* Transition overlay */}
      {transitioning && <div className="battle-transition"></div>}

      {/* Battlefield */}
      {phase === "battle" && !transitioning && (
        <div className="WWbattlefield">
          <h1 id="BBTitle">Woodlands</h1>
          <BattleManager
            enemies={enemies}
            onBattleEnd={(didWin) => {
              WesternWoodBattleComplete(didWin);
              if (didWin && !westernWoodFirstBattleDone) {
                setMap2Trigger(true); // 🔥 unlock Summoner class after first victory
              }
            }}
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

export default WesternWoodBattle;
