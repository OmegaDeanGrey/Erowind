import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParty } from "../Components/Context/PartyContext";
import baseStatsByClass from "../Components/Character/BaseStats";

import "./TeamMates.css";
import "../App.css";

function Summoner() {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const { party, addToParty } = useParty();
  const isPartyFull = party.length >= 5;
  const [summoner, setSummoner] = useState(null);

  const generateNewSummoner = () => {
    const names = [
      "Mika",
      "Rober",
      "DeMarche",
      "DeMarco",
      "Marco",
      "Endira",
      "Samantha",
      "Googel",
      "French",
      "Seamus",
      "Siobhan",
    ];
    const usedNames = new Set(party.map((member) => member.name));
    const availableNames = names.filter((name) => !usedNames.has(name));
    const randomName =
      availableNames.length > 0
        ? availableNames[Math.floor(Math.random() * availableNames.length)]
        : `Summoner${Math.floor(Math.random() * 1000)}`;

    const summonerBase = baseStatsByClass["Summoner"];
    const baseHP = summonerBase.HP + Math.floor(Math.random() * 10);

    return {
      name: randomName,
      role: "Summoner",
      strength: summonerBase.Strength + Math.floor(Math.random() * 10),
      intelligence: summonerBase.Intelligence + Math.floor(Math.random() * 10),
      speed: summonerBase.Speed + Math.floor(Math.random() * 10),
      defense: summonerBase.Defense + Math.floor(Math.random() * 10),
      maxHP: baseHP,
      currentHP: baseHP,
      level: 1,
      BG: summonerBase.BG,
      Icon: summonerBase.Icon,
      Experience: 0,
      Evolution: 10,
      evolved: "Conjurer",
      ability: "Summon Bahamut",
    };
  };

  useEffect(() => {
    setSummoner(generateNewSummoner());
  }, []);

  const handleAddToParty = () => {
    if (isPartyFull || !summoner) return;

    addToParty(summoner);
    setShowOverlay(true);

    setTimeout(() => {
      setShowOverlay(false);
      setSummoner(generateNewSummoner()); // Generate a new unique fighter
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
            backgroundColor: "rgba(0, 0, 0, 0.55)", // Semi-transparent black
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9000,
            textShadow: "3px 13px 10px black, 0 0 20px grey",
          }}
        >
          <h1
            style={{
              color: "red",
              fontSize: "8rem",
              textShadow: "0 0 10px black, 0 0 20px grey",
              animation: "fadeIn 3s ease-out",
            }}
          >
            Summoner <br />
            Arise & Destroy
          </h1>
        </div>
      )}

      {isPartyFull && (
        <div>
          <p id="PFFighter">Party Full</p>
        </div>
      )}
      <div className="containerdiv">
        <div id="Summonerall">
          <p id="Summonertitle">Summoner</p>
          <div id="Summonerdesc">
            <h2>Abilty: Familiar</h2>

            <p>Summon Monster to damage any number of opponents</p>
          </div>
          <div id="Summoneratt">
            <ul>
              <li>Str: 20</li>
              <li>Int: 50</li>
              <li>Spd: 10</li>
              <li>Def: 45</li>
              <li>HP: 40</li>
            </ul>
          </div>
          <div id="buttoncasesum">
            <button
              id="SummonerSelectButton"
              className="Summonerbutt"
              onClick={handleAddToParty}
              disabled={isPartyFull} // Disable button if the party is full
            >
              Recruit
            </button>

            <button
              id="SummonerbttButton"
              className="Summonerbutt"
              onClick={() => navigate("/Party")}
            >
              View Party
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Summoner;
