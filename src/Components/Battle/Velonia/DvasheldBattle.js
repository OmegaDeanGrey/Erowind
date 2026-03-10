import React, { useState } from "react";
import DvasheldEnemies from "../Velonia/DvasheldEnemies";
import DvasheldSpoils from "./DvasheldSpoils.js";
import BattleManager from "../BattleManager";
import { useNavigate } from "react-router-dom";
import "../Battle.css";
import "../Velonia/Velonia.css";
import "../../Utility/Animations.css";
import DialogBox from "../../Utility/DialogBox";
import { useParty } from "../../Context/PartyContext.js";

function DvasheldBattle() {
  const navigate = useNavigate();
  const { setMap3Trigger } = useParty();
  const { party } = useParty();

  const heroData = JSON.parse(localStorage.getItem("finalCharacter"));
  const mainName = heroData?.Name || "Hero";

  // ---------- STATE ----------
  const [enemies, setEnemies] = useState([]);
  const [phase, setPhase] = useState("dialog1");
  const [dialogIndex1, setDialogIndex1] = useState(0);
  const [dialogIndex2, setDialogIndex2] = useState(0);
  const [dialogIndex3, setDialogIndex3] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [battleResult, setBattleResult] = useState(null);

  const [firstBattleDone, setFirstBattleDone] = useState(
    JSON.parse(localStorage.getItem("dvasheldFirstBattleDone")) || false
  );

  // ---------- DIALOG ----------
  const dialogue1 = !firstBattleDone
    ? [
        {
          text: "Dwarf talk!",
          name: "Quon",
        },
        {
          text: "For the Dwarven Kingdom!",
          name: mainName,
          portrait: "/HeroIcon.png",
        },
      ]
    : [
        { text: "You hear the falls rushing nearby.." },
        { text: "A rumble can be heard beneath it.", name: "Narrator" },
        { text: "Get Ready!", name: mainName, portrait: "/HeroIcon.png" },
      ];

  const dialogue2 = [
    { text: "Shadows emerge from the mist...", name: "Voice" },
    { text: "We shall prvail...", name: mainName, portrait: "/HeroIcon.png" },
  ];

  const dialogue3 = [
    { text: "You have defeated the Giant Spider!", name: mainName },
    { text: "You received the Mountain Pass Key.", name: "Narrator" },
    {
      text: "The path to Sableheim is now open.",
      name: mainName,
      portrait: "/HeroIcon.png",
    },
  ];

  // ---------- DIALOG FLOW ----------
  const nextDialog1 = () => {
    if (dialogIndex1 < dialogue1.length - 1) {
      setDialogIndex1(dialogIndex1 + 1);
    } else {
      if (firstBattleDone) {
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

  // ---------- ENEMY SETUP ----------
  const prepareBattle = () => {
    let generated;

    if (!firstBattleDone) {
      generated = [
        DvasheldEnemies.GiantSpider(),
        ...DvasheldEnemies.Spiders(5),
      ];
    } else {
      generated = DvasheldEnemies.randomEnemies(3);
    }

    setEnemies(generated);
    setPhase("battleIntro");
  };

  // ---------- BATTLE START ----------
  const startBattle = () => {
    setTransitioning(true);
    setTimeout(() => {
      setPhase("battle");
      setTransitioning(false);
    }, 700);
  };

  const returnToTown = () => navigate("/Dvasheld");

  // ---------- BATTLE COMPLETE ----------
  const dvasheldBattleComplete = (didWin) => {
    setBattleResult(didWin ? "victory" : "defeat");

    if (didWin && !firstBattleDone) {
      // mark complete
      localStorage.setItem("dvasheldFirstBattleDone", "true");
      setFirstBattleDone(true);

      // add key item safely (no duplicates)
      const items = JSON.parse(localStorage.getItem("items") || "[]");
      const already = items.find((i) => i.name === "Mountain Pass Key");

      if (!already) {
        items.push({
          name: "Mountain Pass Key",
          description: "Allows travel through the Mountain Pass to Sableheim.",
          type: "key",
          image: "/DMGK.png",
        });
        localStorage.setItem("items", JSON.stringify(items));
      }

      setMap3Trigger(true);

      setDialogIndex3(0);
      setPhase("dialog3");
    } else {
      setPhase("complete");
    }
  };

  // ---------- RENDER ----------
  return (
    <div>
      {phase === "dialog1" && !transitioning && (
        <div id="DDialog1">
          <DialogBox
            {...dialogue1[dialogIndex1]}
            onNext={nextDialog1}
            isLast={dialogIndex1 === dialogue1.length - 1}
          />
        </div>
      )}

      {phase === "dialog2" && !transitioning && (
        <DialogBox
          {...dialogue2[dialogIndex2]}
          onNext={nextDialog2}
          isLast={dialogIndex2 === dialogue2.length - 1}
        />
      )}

      {phase === "dialog3" && !transitioning && (
        <DialogBox
          {...dialogue3[dialogIndex3]}
          onNext={nextDialog3}
          isLast={dialogIndex3 === dialogue3.length - 1}
        />
      )}

      {phase === "battleIntro" && !transitioning && (
        <div id="DBOut">
          <div className="battle-intro-modal">
            <h2>⚔️ Battle Incoming</h2>

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
              {enemies.map((e, i) => (
                <li key={i}>
                  {e.name} — HP {e.currentHP}
                </li>
              ))}
            </ul>

            <button onClick={startBattle}>Begin Battle</button>
            <button onClick={returnToTown}>Return to Town</button>
          </div>
        </div>
      )}

      {transitioning && <div className="battle-transition"></div>}

      {phase === "battle" && !transitioning && (
        <div className="Dbattlefield">
          <BattleManager
            enemies={enemies}
            onBattleEnd={dvasheldBattleComplete}
          />
          <button classname="bbreturn" onClick={returnToTown}>
            Return to Town
          </button>
        </div>
      )}

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
              <DvasheldSpoils />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DvasheldBattle;
