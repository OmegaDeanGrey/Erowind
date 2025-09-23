import "./Velonia.css";
import "../../Utility/Animations.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParty } from "../../Context/PartyContext.js";

function Sableheim() {
  const navigate = useNavigate();
  const { party } = useParty();

  const [showMenu, setShowMenu] = useState(false);
  const [menuType, setMenuType] = useState(null); // "team" or "dwarves"

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
            <div className="menu2">
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
                  ["Vai", "SherEm", "NiVei", "Ana", "Vii"].map(
                    (dwarf, index) => (
                      <li
                        key={index}
                        onClick={() => handleClick(dwarf, index)}
                        id="dwarfmenu"
                      >
                        {dwarf}
                      </li>
                    )
                  )}
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
