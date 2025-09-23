import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParty } from "../../Context/PartyContext.js";

function Dvasheld() {
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

  const dwarfMessages = [
    "Stone and steel, friend.",
    "Ale flows deep in Dvasheld!",
    "The mountains remember.",
    "Axes ready, hearts steady.",
    "Our halls stand eternal!",
  ];

  const handleClick = (speaker, index) => {
    let messageSet = menuType === "team" ? partyMessages : dwarfMessages;
    let message = `${speaker} says: "${messageSet[index % messageSet.length]}"`;
    alert(message);
    setShowMenu(false);
  };

  return (
    <>
      <div id="Dvasheldout">
        <div id="leftnav2">
          <ul>
            <li>
              <button
                onClick={() => navigate("/CounselRoom")}
                className="lnbutt2"
              >
                Go to Council Room
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
                className="lnbutt2"
              >
                {showMenu && menuType === "team" ? "Nevermind" : "Talk to Team"}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setMenuType("dwarves");
                  setShowMenu((prev) => !prev);
                }}
                className="lnbutt2"
              >
                {showMenu && menuType === "dwarves"
                  ? "Nevermind"
                  : "Talk to Dwarves"}
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/DvasheldBattle")}
                className="lnbutt2"
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

                {menuType === "dwarves" &&
                  ["Tordin", "Dein Biali", "Dvaka", "Ohn Gondlin", "Rhoka"].map(
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
          <h1 id="villagetitle">Dvasheld</h1>
          <h3 id="villagesubtitle">Dwarven StrongHold</h3>
        </div>
      </div>
    </>
  );
}

export default Dvasheld;
