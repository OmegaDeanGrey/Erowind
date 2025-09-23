import "../../App.css";
import React, { useEffect, useState } from "react";
import baseStatsByClass from "../Character/BaseStats";
import { useParty } from "../Context/PartyContext";
import elementPowers from "../Power/ElementPower";

function Character() {
  const [quizStats, setQuizStats] = useState({});
  const [strengthResults, setStrengthResults] = useState(0);
  const [powerFlag, setPowerFlag] = useState(false);
  const { characterStats, setCharacterStats } = useParty();

  // --- helper: sum trial results -> heroPower level (1..3)
  const calcHeroPower = () => {
    const trials = [
      "trialoneresults",
      "trialtworesults",
      "trialthreeresults",
      "trialfourresults",
      "trialfiveresults",
      "trialsixresults",
    ];

    const sum = trials.reduce((acc, key) => {
      const val = Number(localStorage.getItem(key)) || 0;
      return acc + val;
    }, 0);

    if (sum === 0) return null; // not ready
    if (sum <= 6) return 1;
    if (sum <= 12) return 2;
    return 3;
  };

  // --- helper: map element + heroPower -> move string
  const pickBattleMove = (subElementLabel, heroPowerLevel) => {
    if (!subElementLabel || !heroPowerLevel) return null;
    const table = elementPowers[subElementLabel];
    if (!table) return null;
    return table[heroPowerLevel] || null;
  };

  useEffect(() => {
    const savedStats = localStorage.getItem("characterStats");
    const headgear = localStorage.getItem("headgear");
    const accessory = localStorage.getItem("accessory");
    const mail = localStorage.getItem("mail");

    const TOne = localStorage.getItem("trialoneresults");
    const TTwo = localStorage.getItem("trialtworesults");
    const TThree = localStorage.getItem("trialthreeresults");
    const TFour = localStorage.getItem("trialfourresults");
    const TFive = localStorage.getItem("trialfiveresults");
    const TSix = localStorage.getItem("trialsixresults");

    if (TOne && TTwo && TThree && TFour && TFive && TSix) {
      setPowerFlag(true);
    }

    const parsedStats = savedStats ? JSON.parse(savedStats) : {};
    const charClass = parsedStats.Class;
    const subElement = parsedStats.Element;
    const baseStats = baseStatsByClass[charClass] || {};

    let str = baseStats.Strength || 0;
    let int = baseStats.Intelligence || 0;
    let spd = baseStats.Speed || 0;
    let def = baseStats.Defense || 0;
    let hp = baseStats.HP || 0;

    // --- equipment effects ---
    if (headgear === "Feathered Cap") spd += 4;
    if (headgear === "Heavy Helm") {
      spd -= 2;
      def += 2;
      hp += 2;
    }
    if (mail === "Studded Leather") {
      spd += 1;
      def += 1;
    }
    if (mail === "Plate Mail") {
      spd -= 4;
      def += 2;
      hp += 4;
    }
    if (accessory === "Ionia Spellbook") {
      int += 3;
      def -= 1;
    }
    if (accessory === "Robust Sheild") {
      def += 3;
      spd -= 1;
    }
    if (accessory === "Coat of Arms") {
      str += 2;
      hp += 1;
    }
    if (accessory === "Sableim Amulet") hp += 5;
    if (accessory === "Hermes Bracer") {
      spd += 3;
      def += 2;
      hp -= 3;
    }

    // --- compute hero power level and battle move ---
    const heroPowerLevel = calcHeroPower();
    const battleMove = pickBattleMove(subElement, heroPowerLevel);

    const finalCharacter = {
      ...parsedStats,
      Strength: str,
      Intelligence: int,
      Speed: spd,
      Defense: def,
      HP: hp,
      HeroPowerLevel: heroPowerLevel || null,
      BattlePower: battleMove || null,
    };

    localStorage.setItem("finalCharacter", JSON.stringify(finalCharacter));
    setCharacterStats(finalCharacter);
    setQuizStats({ Intelligence: int, Speed: spd, Defense: def, HP: hp });
    setStrengthResults(str);
  }, [setCharacterStats]);

  // --- filter out unwanted keys from main stats list ---
  const displayStats = Object.entries(characterStats).filter(
    ([key]) =>
      !["HeroPowerLevel", "BattlePower", "role", "Portrait"].includes(key)
  );

  return (
    <div id="CharacterContainer">
      <div id="BgCharacter">
        <h1 id="CharacterTitle">{characterStats.name}</h1>

        {/* Portrait display */}
        {/* {characterStats.Portrait && (
          <div style={{ marginBottom: "20px" }}>
            <img
              src={characterStats.Portrait}
              alt="Hero Portrait"
              style={{ width: "200px", borderRadius: "10px" }}
            />
          </div>
        )} */}

        <div id="characterinsides">
          <h2 className="statslabel">Character Stats</h2>
          {displayStats.length > 0 ? (
            <ul>
              {displayStats.map(([key, value]) => (
                <li key={key} id="AttributeListItems">
                  {key} - {value}
                </li>
              ))}
            </ul>
          ) : (
            <p id="NoCharacter">No character saved yet.</p>
          )}
        </div>

        {powerFlag && characterStats.HeroPowerLevel && (
          <div>
            <h2>Hero Power: {characterStats.HeroPowerLevel}</h2>
            {characterStats.BattlePower && (
              <h3 className="battle-move">
                Awarded Battle Move: {characterStats.BattlePower}
              </h3>
            )}
          </div>
        )}

        <h2 id="CYT">Complete Your Trials to Finalize Character Stats</h2>
      </div>
    </div>
  );
}

export default Character;
