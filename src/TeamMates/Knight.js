import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParty } from "../Components/Context/PartyContext";
import baseStatsByClass from "../Components/Character/BaseStats";

function Knight() {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const { party, addToParty } = useParty();
  const isPartyFull = party.length >= 5;
  const [Knight, setKnight] = useState(null);
  const [evolute, setEvolute] = useState(false);

  const generateNewKnight = () => {
    const names = [
      "Bob",
      "Charlie",
      "Diana",
      "Frank",
      "Mike",
      "Joe",
      "Drew",
      "Kornebari",
      "Dot",
      "Vaughn",
      "Bean",
      "Jake",
      "Alicia",
      "Bobby",
      "Charles",
      "Dana",
      "Evan",
      "Mika",
      "Joey",
      "Dora",
      "Barni",
      "Valerie",
      "Dottie",
      "Vince",
    ];

    // Get unique name
    const usedNames = new Set(party.map((member) => member.name));
    const availableNames = names.filter((name) => !usedNames.has(name));
    const randomName =
      availableNames.length > 0
        ? availableNames[Math.floor(Math.random() * availableNames.length)]
        : `Knight${Math.floor(Math.random() * 1000)}`;

    const KnightBase = baseStatsByClass["Knight"];
    const baseHP = KnightBase.HP + Math.floor(Math.random() * 10);

    return {
      name: randomName,
      role: "Knight",
      strength: KnightBase.Strength + Math.floor(Math.random() * 10),
      intelligence: KnightBase.Intelligence + Math.floor(Math.random() * 10),
      speed: KnightBase.Speed + Math.floor(Math.random() * 10),
      defense: KnightBase.Defense + Math.floor(Math.random() * 10),
      maxHP: baseHP,
      currentHP: baseHP,
      level: 1,
      BG: KnightBase.BG,
      Icon: KnightBase.Icon,
      Experience: 0,
      Evolution: 10,
      evolved: "Cavalry",
      ability: "Slash",
    };
  };

  useEffect(() => {
    setKnight(generateNewKnight());
  }, []);

  const handleAddToParty = () => {
    if (isPartyFull || !Knight) return;

    addToParty(Knight);
    setShowOverlay(true);

    setTimeout(() => {
      setShowOverlay(false);
      setKnight(generateNewKnight()); // Generate a new unique Knight
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
            backgroundColor: "rgba(37, 36, 36, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9000,
            textShadow: "0 0 10px black, 0 0 20px grey",
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "8rem",
              textShadow: "0 0 10px #ff0, 0 0 20px #ff0",
              animation: "fadeIn 1s ease-out",
            }}
          >
            Knight <br />
            Ready to Battle!
          </h1>
        </div>
      )}

      {isPartyFull && (
        <div>
          <p id="PFKnight">Party Full</p>
        </div>
      )}

      <div className="containerdiv">
        <video muted autoPlay playsInline id="KnightVid">
          <source src="./Knight.mp4" type="video/mp4" />
        </video>
        <div id="Knightall">
          <h1 id="Knighttitle">Knight</h1>
          <div className="desccanvas" id="Knightdesc">
            <h2>Ability: Slash</h2>
            <p>Attacks Single front row with powerful blow</p>
          </div>
          <div>
            <ul id="Knightadj">
              <li>Str: 60</li>
              <li>Int: 10</li>
              <li>Spd: 20</li>
              <li>Def: 55</li>
              <li>HP: 40</li>
            </ul>
          </div>
        </div>
        <div className="buttoncase">
          <button
            className="dabuttons"
            id="KnightSelectButton"
            onClick={handleAddToParty}
            disabled={isPartyFull}
          >
            Recruit
          </button>

          <button
            className="dabuttons"
            id="KnightbttButton"
            onClick={() => navigate("/Party")}
          >
            View Party
          </button>
        </div>
      </div>
    </>
  );
}

export default Knight;
