import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParty } from "../Components/Context/PartyContext";
import baseStatsByClass from "../Components/Character/BaseStats";
import { requestFormReset } from "react-dom";

function Rogue() {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const { party, addToParty } = useParty();
  const isPartyFull = party.length >= 5;
  const [rogue, setRogue] = useState("");
  const [evolute, setEvolute] = useState(false);

  const generateNewRogue = () => {
    const names = [
      "Gervais",
      "Penguin",
      "Jack",
      "Perder",
      "Poppie",
      "Dan",
      "Helio",
      "Benjamin",
      "Donald",
      "Mick",
    ];

    const usedNames = new Set(party.map((member) => member.name));
    const availableNames = names.filter((name) => !usedNames.has(name));
    const randomName =
      availableNames.length > 0
        ? availableNames[Math.floor(Math.random() * availableNames.length)]
        : `Rogue${Math.floor(Math.random() * 1000)}`;

    const rogueBase = baseStatsByClass["Rogue"];
    const baseHP = rogueBase.HP + Math.floor(Math.random() * 10);

    return {
      name: randomName,
      role: "Rogue",
      strength: rogueBase.Strength + Math.floor(Math.random() * 10),
      intelligence: rogueBase.Intelligence + Math.floor(Math.random() * 10),
      speed: rogueBase.Speed + Math.floor(Math.random() * 10),
      defense: rogueBase.Defense + Math.floor(Math.random() * 10),
      maxHP: baseHP,
      currentHP: baseHP,
      level: 1,
      BG: rogueBase.BG,
      Icon: rogueBase.Icon,
      Experience: 0,
      Evolution: 10,
      evolved: "Knave",
      ability: "Steal",
    };
  };

  useEffect(() => {
    setRogue(generateNewRogue());
  }, []);

  const handleAddToParty = () => {
    if (isPartyFull || !rogue) return;

    addToParty(rogue);
    setShowOverlay(true);

    setTimeout(() => {
      setShowOverlay(false);
      setRogue(generateNewRogue()); // Generate a new unique fighter
    }, 2000);
  };

  return (
    <>
      {showOverlay && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(19, 18, 18, 0.7)", // Semi-transparent black
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9000,
            textShadow: "0 0 10px black, 0 0 20px grey",
          }}
        >
          <h1
            style={{
              color: "black",
              fontSize: "8rem",
              textShadow: "0 0 10px white, 0 0 20px grey",
              animation: "fadeIn 7s ease-out",
            }}
          >
            Rogue <br />
            Out from the Shadows
          </h1>
        </div>
      )}

      {isPartyFull && (
        <div>
          <p id="PFFighter">Party Full</p>
        </div>
      )}

      <div className="containerdiv">
        <div id="Rogueall">
          <h1 id="Roguetitle">Rogue</h1>
          <div id="Roguedesc">
            <h2>Ability: BackStab</h2>

            <p>Critical Hit Chance attack </p>
          </div>
          <div>
            <ul id="Rogueadj">
              <li>Str: 30</li>
              <li>Int: 40</li>
              <li>Spd: 60</li>
              <li>Def: 25</li>
              <li>HP: 30</li>
            </ul>
          </div>

          <button
            className="roguebutt"
            id="RogueSelectButton"
            onClick={handleAddToParty}
            disabled={isPartyFull}
          >
            Recruit
          </button>

          <button
            className="roguebutt"
            id="RoguebttButton"
            onClick={() => navigate("/Party")}
          >
            View Team
          </button>
        </div>
      </div>
    </>
  );
}

export default Rogue;
