import "./Velonia.css";
import "../../Utility/Animations.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParty } from "../../Context/PartyContext.js";
import DialogBox from "../../Utility/DialogBox.js";

function Sableheim() {
  const navigate = useNavigate();
  const { party } = useParty();

  const [showMenu, setShowMenu] = useState(false);
  const [menuType, setMenuType] = useState(null); // "team" or "dwarves"
  const [dialogIndex, setDialogIndex] = useState(0);
  const heroData = JSON.parse(localStorage.getItem("finalCharacter"));
  const mainName = heroData?.Name || "Hero";

  const dialogue1 = [
    {
      text: "The winds outside Bressone carry whispers of danger...",
      name: "Narrator",
    },
    {
      text: "A group of monsters lurks beyond the city walls.",
      name: "Narrator",
    },
    {
      text: "Your party steels themselves for the coming fight.",
      name: "Narrator",
    },
    {
      text: "You are too puny to defeat us!",
      name: "Monster",
      portrait: "/GoblinLeader.png",
    },
    { text: "Prepare for battle!", name: mainName, portrait: "/Hero.png" },
  ];

  const partyMessages = [
    "We have saved our home, now we must help the dwarves",
    "Stay sharp out there!",
    "Look to the Peak in the East",
    "For glory and honor!",
    "Watch my back, I'll watch yours!",
  ];

  const fairyMessages = [
    "Stone and steel, friend.",
    "Ale flows deep in Dvasheld!",
    "The mountains remember.",
    "Axes ready, hearts steady.",
    "Our halls stand eternal!",
  ];

  const nextDialog1 = () => {
    if (dialogIndex < dialogue1.length - 1) {
      setDialogIndex(dialogIndex + 1);
    }
  };

  const handleClick = (speaker, index) => {
    let messageSet = menuType === "team" ? partyMessages : fairyMessages;
    let message = `${speaker} says: "${messageSet[index % messageSet.length]}"`;
    alert(message);
    setShowMenu(false);
  };

  return (
    <>
      <div id="Sableheimout">
        <div className="sparkle"></div>
        <div className="bressone-battle-container">
          <DialogBox
            {...dialogue1[dialogIndex]}
            onNext={nextDialog1}
            isLast={dialogIndex === dialogue1.length - 1}
          />
        </div>
        <div id="leftnav2">
          <ul>
            <li>
              <button
                onClick={() => navigate("/CounselRoom")}
                className="lnbutt4"
              >
                Fairy Conclave
              </button>
            </li>
            {/* <li>
              <button onClick={() => navigate("/Shop")} className="lnbutt2">
                Go To Shop
              </button>
            </li> */}
            <li>
              <button
                onClick={() => {
                  setMenuType("team");
                  setShowMenu((prev) => !prev);
                }}
                className="lnbutt4"
              >
                {showMenu && menuType === "team" ? "Nevermind" : "Talk to Team"}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setMenuType("faeries");
                  setShowMenu((prev) => !prev);
                }}
                className="lnbutt4"
              >
                {showMenu && menuType === "faeries"
                  ? "Nevermind"
                  : "Talk to Fairies"}
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/WesternWoodBattle")}
                className="lnbutt4"
              >
                Battle
              </button>
            </li>
          </ul>

          {showMenu && (
            <div className="menu4">
              <ul>
                {menuType === "team" &&
                  party.map((member, index) => (
                    <li
                      key={index}
                      onClick={() => handleClick(member.name, index)}
                    >
                      {member.name} - {member.role}
                    </li>
                  ))}

                {menuType === "faeries" &&
                  [
                    "A Lai Un",
                    "Fin E Fa",
                    "A Dei Da Lun",
                    "Fro Fen Io",
                    "Burt",
                  ].map((faerie, index) => (
                    <li
                      key={index}
                      onClick={() => handleClick(faerie, index)}
                      id="faeriemenu"
                    >
                      {faerie}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <h1 id="sableheimtitle">Sableheim</h1>
          <h3 id="sableheimsubtitle">Fairy Kingdom</h3>
        </div>
      </div>
    </>
  );
}

export default Sableheim;
