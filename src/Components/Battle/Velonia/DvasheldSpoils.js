import React, { useEffect, useState } from "react";
import { useParty } from "../../Context/PartyContext";

function DvasheldSpoils() {
  const { party, setParty } = useParty();
  const [expGained, setExpGained] = useState(0);
  const [itemDropped, setItemDropped] = useState(null);

  useEffect(() => {
    if (!party || party.length === 0) return;

    // 1️⃣ Random EXP gain (20–50)
    const totalExp = Math.floor(Math.random() * 30) + 20;
    setExpGained(totalExp);

    // 2️⃣ Apply EXP to all members
    const updatedParty = party.map((member) => ({
      ...member,
      exp: (member.exp || 0) + totalExp,
    }));

    setParty(updatedParty);

    // 3️⃣ 20% chance for a random consumable item drop
    if (Math.random() < 0.2) {
      const drop = {
        name: "Healing Herb",
        description: "Restores 25 HP when used.",
        type: "consumable",
      };

      setItemDropped(drop);

      // Add to localStorage inventory
      const items = JSON.parse(localStorage.getItem("items") || "[]");
      items.push(drop);
      localStorage.setItem("items", JSON.stringify(items));
    }
  }, []);

  return (
    <div className="bressone-spoils">
      <h2>🎁 Spoils of Battle</h2>
      <p>
        Each party member gained <strong>{expGained}</strong> EXP!
      </p>

      {itemDropped ? (
        <p>
          💎 You found a <strong>{itemDropped.name}</strong>!
        </p>
      ) : (
        <p>No items dropped this time...</p>
      )}
    </div>
  );
}

export default DvasheldSpoils;
