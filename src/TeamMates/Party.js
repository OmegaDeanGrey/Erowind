import React from "react";
import { useParty } from "../Components/Context/PartyContext.js";
import "./TeamMates.css";
import Character from "../Components/Character/Character.js";

function Party() {
  const { party, removeFromParty, clearParty, setParty } = useParty();

  const sortByStrength = () => {
    const sorted = [...party].sort((a, b) => b.strength - a.strength);
    setParty(sorted);
  };

  const sortByInt = () => {
    const sorted = [...party].sort((a, b) => b.intelligence - a.intelligence);
    setParty(sorted);
  };

  const sortByDef = () => {
    const sorted = [...party].sort((a, b) => b.defense - a.defense);
    setParty(sorted);
  };

  const sortBySpeed = () => {
    const sorted = [...party].sort((a, b) => b.speed - a.speed);
    setParty(sorted);
  };

  const sortByHP = () => {
    const sorted = [...party].sort((a, b) => b.maxHP - a.maxHP);
    setParty(sorted);
  };

  return (
    <div className="party-container">
      <div id="BgParty">
        <h2 id="PartyTitle">Hero</h2>
        <Character />
        {party.length === 0 ? (
          <p id="nmiypy">No members in your party yet!</p>
        ) : (
          <>
            <h2 id="partylisttitle">Party</h2>
            <ol className="party-list">
              <h4 id="partylisttopper">SCROLL TO VIEW PARTY</h4>
              {party.map((member, index) => (
                <li
                  key={index}
                  className="party-member-card"
                  style={{
                    backgroundImage: `url(${member.BG})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "white", // optional, for readability on background
                  }}
                >
                  <div className="card-header">
                    <h3>{member.name}</h3>
                    <span className="role-tag">{member.role}</span>
                  </div>
                  <div className="card-body">
                    <p>🛡️ Defense: {member.defense}</p>
                    <p>⚔️ Strength: {member.strength}</p>
                    <p>🧠 Intelligence: {member.intelligence}</p>
                    <p>💨 Speed: {member.speed}</p>
                    <p>
                      ❤️ HP: {member.currentHP} / {member.maxHP}
                    </p>
                  </div>
                  <button
                    className="remove-button fancy-remove"
                    onClick={() => removeFromParty(index)}
                  >
                    ❌ Remove
                  </button>
                </li>
              ))}
            </ol>
          </>
        )}
        {party.length !== 0 && (
          <div id="partybuttons">
            <button
              className="sortbutton"
              id="ClearPartyButton"
              onClick={clearParty}
            >
              Clear Party
            </button>
            <button
              className="sortbutton"
              id="SortByStrengthButton"
              onClick={sortByStrength}
            >
              Sort by Strength
            </button>
            <button
              className="sortbutton"
              id="SortByIntButton"
              onClick={sortByInt}
            >
              Sort by Int
            </button>
            <button
              className="sortbutton"
              id="SortByDefButton"
              onClick={sortByDef}
            >
              Sort by Def
            </button>
            <button
              className="sortbutton"
              id="SortBySpeedButton"
              onClick={sortBySpeed}
            >
              Sort by Speed
            </button>
            <button
              className="sortbutton"
              id="SortByHPButton"
              onClick={sortByHP}
            >
              Sort by HP
            </button>
          </div>
        )}
        ;
      </div>
    </div>
  );
}

export default Party;
