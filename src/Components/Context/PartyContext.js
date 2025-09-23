import React, { createContext, useContext, useState } from "react";

// Create Context
const PartyContext = createContext();

// Custom Hook to use the context
export const useParty = () => useContext(PartyContext);

// Context Provider
export const PartyProvider = ({ children }) => {
  const [party, setParty] = useState([]);
  const [fullParty, setFullParty] = useState(false);
  const [map1Trigger, setMap1Trigger] = useState(false);
  const [map2Trigger, setMap2Trigger] = useState(false);
  const [map3Trigger, setMap3Trigger] = useState(false);
  const [map4Trigger, setMap4Trigger] = useState(false);
  const [map5Trigger, setMap5Trigger] = useState(false);
  const [map6Trigger, setMap6Trigger] = useState(false);
  const [map7Trigger, setMap7Trigger] = useState(false);
  const [map8Trigger, setMap8Trigger] = useState(false);
  const [map9Trigger, setMap9Trigger] = useState(false);
  const [recruited, setRecruited] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [characterStats, setCharacterStats] = useState([]);
  const maxPartySize = 5;

  // Add a member to the party
  const addToParty = (member) => {
    if (party.length >= maxPartySize) {
      alert("Party is full! Remove a member to add a new one.");
      setFullParty(true);
      return;
    }

    const initializedMember = {
      ...member,
      currentHP:
        typeof member.currentHP === "number"
          ? member.currentHP
          : typeof member.maxHP === "number"
          ? member.maxHP
          : 1,
      id: `player-${party.length}`,
    };

    setRecruited("");
    setParty((prevParty) => [...prevParty, initializedMember]);
  };

  // Remove a member from the party
  const removeFromParty = (index) => {
    setParty((prevParty) => prevParty.filter((_, i) => i !== index));
  };

  // Clear the party (if needed elsewhere)
  const clearParty = () => {
    setParty([]);
  };

  // Apply damage to a member by index
  const applyDamage = (index, amount) => {
    setParty((prevParty) =>
      prevParty.map((member, i) => {
        if (i === index) {
          let newHP = member.currentHP - amount;
          if (newHP < 0) newHP = 0; // floor at 0
          return { ...member, currentHP: newHP };
        }
        return member;
      })
    );
  };

  // Heal a member by index
  const healMember = (index, amount) => {
    setParty((prevParty) =>
      prevParty.map((member, i) => {
        if (i === index) {
          let newHP = member.currentHP + amount;
          if (newHP > member.maxHP) newHP = member.maxHP; // cap at max
          return { ...member, currentHP: newHP };
        }
        return member;
      })
    );
  };

  return (
    <PartyContext.Provider
      value={{
        party,
        setParty,
        recruited,
        setRecruited,
        addToParty,
        removeFromParty,
        clearParty,
        applyDamage, // <-- add
        healMember,
        fullParty,
        setFullParty,
        characterName,
        setCharacterName,
        characterStats,
        setCharacterStats,
        map1Trigger,
        setMap1Trigger,
        map2Trigger,
        setMap2Trigger,
        map3Trigger,
        setMap3Trigger,
        map4Trigger,
        setMap4Trigger,
        map5Trigger,
        setMap5Trigger,
        map6Trigger,
        setMap6Trigger,
        map7Trigger,
        setMap7Trigger,
        map8Trigger,
        setMap8Trigger,
        map9Trigger,
        setMap9Trigger,
      }}
    >
      {children}
    </PartyContext.Provider>
  );
};
