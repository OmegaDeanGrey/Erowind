import React, { useEffect, useState } from "react";
import { useParty } from "../Components/Context/PartyContext.js";
import "./TeamMates.css";
import Character from "../Components/Character/Character.js";

function Party() {
  const { party, removeFromParty, clearParty, setParty } = useParty();
  const [evolutionMessage, setEvolutionMessage] = useState("");
  const [evolvingMember, setEvolvingMember] = useState(null);

  // 🧠 Sorting functions
  const sortByStrength = () =>
    setParty([...party].sort((a, b) => b.strength - a.strength));
  const sortByInt = () =>
    setParty([...party].sort((a, b) => b.intelligence - a.intelligence));
  const sortByDef = () =>
    setParty([...party].sort((a, b) => b.defense - a.defense));
  const sortBySpeed = () =>
    setParty([...party].sort((a, b) => b.speed - a.speed));
  const sortByHP = () => setParty([...party].sort((a, b) => b.maxHP - a.maxHP));

  // 🧬 Evolution trigger logic
  useEffect(() => {
    if (!party || party.length === 0) return;

    let hasReadyToEvolve = false;
    const updatedParty = party.map((member) => {
      if (
        member.exp >= member.Evolution &&
        !member.hasEvolved &&
        !member.readyToEvolve
      ) {
        hasReadyToEvolve = true;
        return { ...member, readyToEvolve: true };
      }
      return member;
    });

    if (hasReadyToEvolve) {
      setParty(updatedParty);
      setEvolutionMessage("Heroes can evolve!");
      setTimeout(() => setEvolutionMessage(""), 3000);
    }
  }, [party, setParty]);

  // 🧱 Modal definition
  const EvolutionModal = ({ member, onChoose, onClose }) => {
    const choices = {
      Fighter: ["Knight", "Cavalry", "Amazon"],
      Mage: ["Archmage", "Sorcerer", "Summoner"],
    };

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>{member.name} can evolve!</h2>
          <p>Select a path:</p>
          <div className="choice-buttons">
            {choices[member.role]?.map((choice) => (
              <button key={choice} onClick={() => onChoose(member, choice)}>
                {choice}
              </button>
            ))}
          </div>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    );
  };

  // 🦋 Evolution choice handler
  const handleEvolveChoice = (member, choice) => {
    const evolvedParty = party.map((m) => {
      if (m === member) {
        const updates = {
          hasEvolved: true,
          readyToEvolve: false,
          role: choice,
        };

        // Example evolution bonuses by class
        if (choice === "Knight")
          Object.assign(updates, {
            strength: m.strength + 20,
            defense: m.defense + 15,
            BG: "/Knight.png",
            portrait: "/Knight.png",
          });

        if (choice === "Cavalry")
          Object.assign(updates, {
            strength: m.strength + 25,
            speed: m.speed + 30,
            BG: "/Cavalry.png",
            portrait: "/Cavalry.png",
          });

        if (choice === "Amazon")
          Object.assign(updates, {
            strength: m.strength + 10,
            speed: m.speed + 20,
            intelligence: m.intelligence + 5,
            BG: "/Amazon.png",
            portrait: "/Amazon.png",
          });

        if (choice === "Archmage")
          Object.assign(updates, {
            intelligence: m.intelligence + 30,
            defense: m.defense + 5,
            BG: "/Archmage.png",
            portrait: "/Archmage.png",
          });

        return { ...m, ...updates };
      }
      return m;
    });

    setParty(evolvedParty);
    setEvolvingMember(null);
  };

  return (
    <div className="party-container">
      {evolutionMessage && (
        <div className="evolution-overlay">
          <p className="evolution-text">{evolutionMessage}</p>
        </div>
      )}

      {evolvingMember && (
        <EvolutionModal
          member={evolvingMember}
          onChoose={handleEvolveChoice}
          onClose={() => setEvolvingMember(null)}
        />
      )}

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
                  className={`party-member-card ${
                    member.readyToEvolve ? "ready-to-evolve" : ""
                  }`}
                  style={{
                    backgroundImage: `url(${member.BG})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "white",
                  }}
                  onClick={() =>
                    member.readyToEvolve && setEvolvingMember(member)
                  }
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
                    <p>Exp: {member.exp}</p>
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
            <button className="sortbutton" onClick={clearParty}>
              Clear Party
            </button>
            <button
              className="sortbutton"
              id="SortByStrengthButton"
              onClick={sortByStrength}
            >
              Sort by Strength
            </button>
            <button className="sortbutton" onClick={sortByInt}>
              Sort by Int
            </button>
            <button className="sortbutton" onClick={sortByDef}>
              Sort by Def
            </button>
            <button className="sortbutton" onClick={sortBySpeed}>
              Sort by Speed
            </button>
            <button className="sortbutton" onClick={sortByHP}>
              Sort by HP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Party;
