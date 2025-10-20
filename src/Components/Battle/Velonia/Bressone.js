import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParty } from "../../Context/PartyContext.js";

function Bressone() {
  const navigate = useNavigate();
  const { party } = useParty();

  const [showMenu, setShowMenu] = useState(false);

  const handleSpeech = () => {
    setShowMenu(true);
  };

  const handleClick = (member, index) => {
    const messages = [
      "Welcome, friend!",
      "Stay sharp out there!",
      "Look to the Peak in the East",
      "For glory and honor!",
      "Watch my back, I'll watch yours!",
    ];

    const message = `${member.name} says: "${messages[index]}"`;

    alert(message);
    setShowMenu(false);
  };

  return (
    <>
      <div id="Bressoneout">
        <div id="leftnav">
          <ul>
            <li>
              <button
                onClick={() => navigate("/OnlyInventory")}
                className="lnbutt"
              >
                View Inventory
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/Shop")} className="lnbutt">
                Go To Shop
              </button>
            </li>
            <li>
              <button
                onClick={showMenu ? () => setShowMenu(false) : handleSpeech}
                className="lnbutt"
              >
                {showMenu ? "Nevermindxx" : "Talk to Team"}
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/BressoneBattle")}
                className="lnbutt"
              >
                Battle
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem("bressoneFirstBattleDone");
                  localStorage.removeItem("goblinKingCrown");
                  window.location.reload(); // reload to restart battle logic
                }}
                className="lnbutt"
              >
                Reset First Battle
              </button>
            </li>
          </ul>
          {showMenu && (
            <div className="menu">
              <ul>
                {party.map((member, index) => (
                  <li key={index} onClick={() => handleClick(member, index)}>
                    {member.name} - {member.role}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          {" "}
          <h1 id="villagetitle">Bressone</h1>
          <h3 id="villagesubtitle">~Valley Home</h3>
        </div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}
export default Bressone;
