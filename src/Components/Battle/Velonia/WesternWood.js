import "./Velonia.css";
import "../../Utility/Animations.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParty } from "../../Context/PartyContext.js";

function WesternWood() {
  const navigate = useNavigate();
  const { party } = useParty();

  const [showMenu, setShowMenu] = useState(false);
  const [menuType, setMenuType] = useState(null); // "team" or "elves"

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
    "The mountains remember.",
    "Axes ready, hearts steady.",
    "Our halls stand eternal!",
  ];

  const handleClick = (speaker, index) => {
    let messageSet = menuType === "team" ? partyMessages : elfMessages;
    let message = `${speaker} says: "${messageSet[index % messageSet.length]}"`;
    alert(message);
    setShowMenu(false);
  };

  // Has the first battle been completed?
  const firstBattleDone =
    JSON.parse(localStorage.getItem("westernWoodFirstBattleDone")) || false;

  return (
    <div id="WesternWoodout">
      <div id="leftnav2">
        <ul>
          {/* Only available after first battle */}
          {firstBattleDone && (
            <>
              <li>
                <button
                  onClick={() => navigate("/ElvenKingdom")}
                  className="lnbutt3"
                >
                  Enter Elven Kingdom
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem("westernWoodFirstBattleDone");
                    localStorage.removeItem("elvenEmblem");
                    window.location.reload(); // reload to restart battle logic
                  }}
                  className="lnbutt"
                >
                  Reset First Battle
                </button>
              </li>
              {/* <li>
                <button
                  onClick={() => {
                    setMenuType("team");
                    setShowMenu((prev) => !prev);
                  }}
                  className="lnbutt3"
                >
                  {showMenu && menuType === "team"
                    ? "Nevermind"
                    : "Talk to Team"}
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
              </li> */}
            </>
          )}

          {/* Battle is always available */}
          <li>
            <button
              onClick={() => navigate("/WesternWoodBattle")}
              className="lnbutt3"
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

              {menuType === "elves" &&
                ["Vai", "SherEm", "NiVei", "Ana", "Vii"].map((elf, index) => (
                  <li
                    key={index}
                    onClick={() => handleClick(elf, index)}
                    id="dwarfmenu"
                  >
                    {elf}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>

      <div>
        <h1 id="villagetitle">WesternWood</h1>
        <h3 id="villagesubtitle">Elven Lands</h3>
      </div>
    </div>
  );
}

export default WesternWood;
