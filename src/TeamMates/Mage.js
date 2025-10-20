import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParty } from "../Components/Context/PartyContext.js";
import baseStatsByClass from "../Components/Character/BaseStats";

function Mage() {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const { party, addToParty } = useParty();
  const isPartyFull = party.length >= 5;
  const [mage, setMage] = useState(null);

  const generateNewMage = () => {
    const names = [
      "Alice",
      "Rage",
      "Venge",
      "Deitric",
      "Aura",
      "Zephyr",
      "Raistlin",
      "Majere",
      "Fugue",
      "Merlin",
      "Dawn",
      "Wren",
      "Fredrica",
      "Kiira",
    ];

    const usedNames = new Set(party.map((member) => member.name));
    const availableNames = names.filter((name) => !usedNames.has(name));
    const randomName =
      availableNames.length > 0
        ? availableNames[Math.floor(Math.random() * availableNames.length)]
        : `Mage${Math.floor(Math.random() * 1000)}`;

    const mageBase = baseStatsByClass["Mage"];
    const baseHP = mageBase.HP + Math.floor(Math.random() * 10);

    return {
      name: randomName,
      role: "Mage",
      strength: mageBase.Strength + Math.floor(Math.random() * 10),
      intelligence: mageBase.Intelligence + Math.floor(Math.random() * 10),
      speed: mageBase.Speed + Math.floor(Math.random() * 10),
      defense: mageBase.Defense + Math.floor(Math.random() * 10),
      maxHP: baseHP,
      currentHP: baseHP,
      level: 1,
      BG: mageBase.BG,
      Icon: mageBase.Icon,
      exp: 0,
      Evolution: 10,
      evolved: "Archmage",
    };
  };

  useEffect(() => {
    setMage(generateNewMage());
  }, []);

  const handleAddToParty = () => {
    if (isPartyFull || !mage) return;

    addToParty(mage);
    setShowOverlay(true);

    setTimeout(() => {
      setShowOverlay(false);
      setMage(generateNewMage()); // Generate a new unique fighter
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
            backgroundColor: "rgba(37, 36, 36, 0.7)", // Semi-transparent black
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9000,
          }}
        >
          <h1
            style={{
              color: "aquamarine",
              fontSize: "8rem",
              textShadow: "0 0 10px #ff0, 0 0 20px #ff0",
              animation: "fadeIn 2s ease-in-out",
            }}
          >
            Mage <br />
            Troll The Respawn, Jeremy.
          </h1>
        </div>
      )}
      {isPartyFull && (
        <div>
          <p id="PFFighter">Party Full</p>
        </div>
      )}
      <div className="containerdiv" id="mageall">
        <video muted autoPlay loop id="MageVid">
          <source src="./MageVid.mp4" type="video/mp4" />
        </video>

        <h1 id="magetitle">Mage</h1>
        <h2 id="magedesc">
          Abilty: Spellcast
          <p>Uses magic to effect a back row enemy</p>
        </h2>
        <div>
          <ul id="mageadj">
            <li>Str: 5</li>
            <li>Int: 70</li>
            <li>Spd: 20</li>
            <li>Def: 25</li>
            <li>HP: 20</li>
          </ul>
        </div>
        <button
          className="dabuttons"
          id="magerecruit"
          onClick={handleAddToParty}
          disabled={isPartyFull}
        >
          Recruit
        </button>

        <button
          className="dabuttons"
          id="MagebttButton"
          onClick={() => navigate("/Party")}
        >
          View Party
        </button>
      </div>
    </>
  );
}

export default Mage;
