import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParty } from "../Components/Context/PartyContext";
import baseStatsByClass from "../Components/Character/BaseStats";

function Fighter() {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const { party, addToParty } = useParty();
  const isPartyFull = party.length >= 5;
  const [fighter, setFighter] = useState(null);
  const [evolute, setEvolute] = useState(false);

  const generateNewFighter = () => {
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
        : `Fighter${Math.floor(Math.random() * 1000)}`;

    const fighterBase = baseStatsByClass["Fighter"];
    const baseHP = fighterBase.HP + Math.floor(Math.random() * 10);

    return {
      name: randomName,
      role: "Fighter",
      strength: fighterBase.Strength + Math.floor(Math.random() * 10),
      intelligence: fighterBase.Intelligence + Math.floor(Math.random() * 10),
      speed: fighterBase.Speed + Math.floor(Math.random() * 10),
      defense: fighterBase.Defense + Math.floor(Math.random() * 10),
      maxHP: baseHP,
      currentHP: baseHP,
      level: 1,
      BG: fighterBase.BG,
      Icon: fighterBase.Icon,
      Experience: 0,
      Evolution: 10,
      evolved: "Cavalry",
      ability: "Joust",
    };
  };

  useEffect(() => {
    setFighter(generateNewFighter());
  }, []);

  const handleAddToParty = () => {
    if (isPartyFull || !fighter) return;

    addToParty(fighter);
    setShowOverlay(true);

    setTimeout(() => {
      setShowOverlay(false);
      setFighter(generateNewFighter()); // Generate a new unique fighter
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
            Fighter <br />
            Ready to Battle!
          </h1>
        </div>
      )}

      {isPartyFull && (
        <div>
          <p id="PFFighter">Party Full</p>
        </div>
      )}

      <div className="containerdiv">
        <video muted autoPlay playsInline id="FighterVid">
          <source src="./Fighter.mp4" type="video/mp4" />
        </video>
        <div id="fighterall">
          <h1 id="fightertitle">Fighter</h1>
          <div className="desccanvas" id="Fighterdesc">
            <h2>Ability: Slash</h2>
            <p>Attacks Single front row with powerful blow</p>
          </div>
          <div>
            <ul id="Fighteradj">
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
            id="FighterSelectButton"
            onClick={handleAddToParty}
            disabled={isPartyFull}
          >
            Recruit
          </button>

          <button
            className="dabuttons"
            id="FighterbttButton"
            onClick={() => navigate("/Party")}
          >
            View Party
          </button>
        </div>
      </div>
    </>
  );
}

export default Fighter;
