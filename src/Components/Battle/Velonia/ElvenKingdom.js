// src/Scenes/ElvenKingdom.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParty } from "../../Context/PartyContext.js";
import DialogRoom from "../../Utility/DialogRoom";
import "../Velonia/Velonia.css";

function ElvenKingdom() {
  const { party } = useParty();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [menuType, setMenuType] = useState(null);
  const [firstVisit, setFirstVisit] = useState(false);
  const [dialogComplete, setDialogComplete] = useState(false);

  const partyMessages = [
    "We have saved our home, now we must help the dwarves",
    "Stay sharp out there!",
    "Look to the Peak in the East",
    "For glory and honor!",
    "Watch my back, I'll watch yours!",
  ];

  const elfMessages = [
    "Stone and steel, friend.",
    "Ale flows deep in Dvasheld!",
    "Your bravery leads me to offer our talented Summoners assistance.",
    "Axes ready, hearts steady.",
    "Our halls stand eternal!",
  ];

  const handleClick = (speaker, index) => {
    let messageSet = menuType === "team" ? partyMessages : elfMessages;
    let message = `${speaker} says: "${messageSet[index % messageSet.length]}"`;
    alert(message);
    setShowMenu(false);
  };

  // check localStorage on mount
  useEffect(() => {
    const visited =
      JSON.parse(localStorage.getItem("elvenKingdomVisited")) || false;
    if (!visited) {
      setFirstVisit(true);
    } else {
      setDialogComplete(true);
    }
  }, []);

  const dialogue = [
    {
      text: "Welcome to the Kingdom Under the Falls...",
      name: "Ahn DaQuin",
      portrait: "/DwarfKing.png",
    },
    {
      text: "Evils linger beyond our Fortress walls.",
      name: "Ahn DaQuin",
      portrait: "/DwarfKing.png",
    },
    {
      text: "Your assistance would be of great relief to our beleaguered warriors.",
      name: "Ahn DaQuin",
      portrait: "/DwarfKing.png",
    },
    {
      text: "We have never seen a shadow so dark in our halls.",
      name: "Ahn DaQuin",
      portrait: "/DwarfKing.png",
    },
    {
      text: "Will you help us Hero?",
      name: "Ahn DaQuin",
      portrait: "/DwarfKing.png",
      choices: [
        { label: "I am with you!", next: 5 },
        { label: "I do not yet trust you.", next: 6 },
      ],
    },
    { text: "Prepare for battle!", name: "Hero", portrait: "/HeroIcon.png" },
    {
      text: "Let's go Gather some information",
      name: "Hero",
      portrait: "/HeroIcon.png",
    },
  ];

  const handleDialogComplete = () => {
    localStorage.setItem("elvenKingdomVisited", true);
    setDialogComplete(true);
    setFirstVisit(false);
  };

  return (
    <div id="CounselRoomOut">
      <div id="CRTitle2">Elven Kingdom</div>

      {/* Show dialog only if first visit */}
      {firstVisit && !dialogComplete && (
        <DialogRoom
          dialogue={dialogue}
          background="/ElvenKingdom.png"
          onComplete={handleDialogComplete}
        />
      )}

      {/* After dialog is done, or on later visits */}
      {dialogComplete && (
        <div id="ElvenKingdomBG">
          <ul>
            <li>
              <button
                onClick={() => {
                  setMenuType("team");
                  setShowMenu((prev) => !prev);
                }}
                className="lnbutt3"
              >
                {showMenu && menuType === "team" ? "Nevermind" : "Talk to Team"}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setMenuType("elves");
                  setShowMenu((prev) => !prev);
                }}
                className="lnbutt3"
              >
                {showMenu && menuType === "elves"
                  ? "Nevermind"
                  : "Talk to Elves"}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate("/WesternWood");
                }}
                className="lnbutt3"
              >
                To Elven Lands
              </button>
            </li>
          </ul>

          {showMenu && (
            <div className="menu2">
              <ul>
                {menuType === "team" &&
                  party.map((member, index) => (
                    <li key={index}>
                      {member.name} - {member.role}
                    </li>
                  ))}

                {menuType === "elves" &&
                  ["Vai", "SherEm", "NiVei", "Ana", "Vii"].map((elf, index) => (
                    <li key={index} id="elfmenu">
                      {elf}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ElvenKingdom;
