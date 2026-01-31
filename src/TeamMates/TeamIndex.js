import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./TeamMates.css";

import Vamp from "./Vamp";
import Fighter from "./Fighter";
import Cleric from "./Cleric";
import Mage from "./Mage";
import Archer from "./Archer";
import Summoner from "./Summoner";
import Rogue from "./Rogue";
import Fairy from "./Fairy";
import Elemental from "./Elemental";
import Giant from "./Giant";
import Witch from "./Witch";
import Centaur from "./Centaur";
import Satyr from "./Satyr";
import Ranger from "./Ranger";
import Android from "./Android.js";
import Valkyrie from "./Valkyrie";
import DemiGod from "./DemiGod";
import WereWolf from "./WereWolf";
import { useParty } from "../Components/Context/PartyContext.js";

function TeamIndex() {
  const [selectedClass, setSelectedClass] = useState(null);
  const {
    fullParty,
    removeFromParty,
    party,

    map1Trigger,
    map2Trigger,
    map3Trigger,
  } = useParty();
  const [showDefault, setShowDefault] = useState(false);

  const toggleClass = (className) => {
    if (selectedClass === className) {
      setSelectedClass(null); // Toggle off
      setShowDefault(true);
    } else {
      setSelectedClass(className); // Show selected
      setShowDefault(false);
    }
  };

  return (
    <div id="out">
      <div id="ButtonsAll">
        <div className="ButtonRows">
          <button
            className="TMB"
            id="FighterButton"
            onClick={() => toggleClass("Fighter")}
          >
            Fighter
          </button>
          <button
            className="TMB"
            id="ClericButton"
            onClick={() => toggleClass("Cleric")}
          >
            Cleric
          </button>
          <button
            className="TMB"
            id="MageButton"
            onClick={() => toggleClass("Mage")}
          >
            Mage
          </button>
          <button
            className="TMB"
            id="ArcherButton"
            onClick={() => toggleClass("Archer")}
          >
            Archer
          </button>
          <button
            className="TMB"
            id="RogueButton"
            onClick={() => toggleClass("Rogue")}
          >
            Rogue
          </button>
          {map1Trigger && (
            <button
              className="TMB"
              id="FairyButton"
              onClick={() => toggleClass("Fairy")}
            >
              Fairy
            </button>
          )}
          ;
          {map2Trigger && (
            <button
              className="TMB"
              id="SummonerButton"
              onClick={() => toggleClass("Summoner")}
            >
              Summoner
            </button>
          )}
          ;
        </div>

        <div className="ButtonRows">
          {map3Trigger && (
            <button
              className="TMB"
              id="VampButton"
              onClick={() => toggleClass("Vamp")}
            >
              Vampire
            </button>
          )}
          ;
          <button
            className="TMB"
            onClick={() => toggleClass("Elemental")}
            id="ElementalButton"
          >
            Elemental
          </button>
          <button
            className="TMB"
            onClick={() => toggleClass("Giant")}
            id="GiantButton"
          >
            Giant
          </button>
          <button
            className="TMB"
            onClick={() => toggleClass("WereWolf")}
            id="WereWolfButton"
          >
            Werewolf
          </button>
          <button
            className="TMB"
            onClick={() => toggleClass("Android")}
            id="AndroidButton"
          >
            Android
          </button>
        </div>
        <div className="ButtonRows">
          <button
            className="TMB"
            onClick={() => toggleClass("Valkyrie")}
            id="ValkyrieButton"
          >
            Valkyrie
          </button>
          <button
            className="TMB"
            onClick={() => toggleClass("DemiGod")}
            id="DemiGodButton"
          >
            DemiGod
          </button>
          <button
            className="TMB"
            onClick={() => toggleClass("Satyr")}
            id="SatyrButton"
          >
            Satyr
          </button>
          <button
            className="TMB"
            onClick={() => toggleClass("Witch")}
            id="WitchButton"
          >
            Witch
          </button>
          <button
            className="TMB"
            onClick={() => toggleClass("Ranger")}
            id="RangerButton"
          >
            Ranger
          </button>
          <button
            className="TMB"
            onClick={() => toggleClass("Centaur")}
            id="CentaurButton"
          >
            Centaur
          </button>
        </div>
      </div>
      <div className="ClassPanel">
        {selectedClass === "Fighter" && (
          <div className="panel-content">
            <Fighter />
            <button
              className="exitbutton"
              onClick={() => {
                setSelectedClass(null);
                setShowDefault(true);
              }}
            >
              View Selections
            </button>
          </div>
        )}
      </div>
      <div className="ClassPanel">
        {selectedClass === "Cleric" && (
          <div className="panel-content">
            <Cleric />
            <button
              className="exitbutton"
              onClick={() => {
                setSelectedClass(null);
                setShowDefault(true);
              }}
            >
              Exit
            </button>
          </div>
        )}
      </div>
      <div className="ClassPanel">
        {selectedClass === "Mage" && (
          <div className="panel-content">
            <Mage />
            <button
              className="exitbutton"
              onClick={() => {
                setSelectedClass(null);
                setShowDefault(true);
              }}
            >
              Exit
            </button>
          </div>
        )}
      </div>
      <div className="ClassPanel">
        {selectedClass === "Archer" && (
          <div className="panel-content">
            <Archer />
            <button
              className="exitbutton"
              onClick={() => {
                setSelectedClass(null);
                setShowDefault(true);
              }}
            >
              Exit
            </button>
          </div>
        )}
      </div>
      <div className="ClassPanel">
        {selectedClass === "Summoner" && (
          <div className="panel-content">
            <Summoner />
            <button
              className="exitbutton"
              onClick={() => {
                setSelectedClass(null);
                setShowDefault(true);
              }}
            >
              Exit
            </button>
          </div>
        )}
      </div>
      <div className="ClassPanel">
        {selectedClass === "Rogue" && (
          <div className="panel-content">
            <Rogue />
            <button
              className="exitbutton"
              onClick={() => {
                setSelectedClass(null);
                setShowDefault(true);
              }}
            >
              Exit
            </button>
          </div>
        )}
      </div>
      <div className="ClassPanel">
        {selectedClass === "Mage" && (
          <div className="panel-content">
            <Mage />
            <button
              className="exitbutton"
              onClick={() => {
                setSelectedClass(null);
                setShowDefault(true);
              }}
            >
              Exit
            </button>
          </div>
        )}
      </div>
      <div className="ClassPanel">
        {selectedClass === "Fairy" && (
          <div className="panel-content">
            <Fairy />
            <button
              className="exitbutton"
              onClick={() => {
                setSelectedClass(null);
                setShowDefault(true);
              }}
            >
              Exit
            </button>
          </div>
        )}
      </div>
      <div className="ClassPanel">
        {selectedClass === "Vamp" && (
          <div className="panel-content">
            <Vamp />
            <button
              className="exitbutton"
              onClick={() => {
                setSelectedClass(null);
                setShowDefault(true);
              }}
            >
              Exit
            </button>
          </div>
        )}
      </div>{" "}
      <div className="ClassPanel">
        {selectedClass === "Elemental" && (
          <div className="panel-content">
            <Elemental />
            <button
              className="exitbutton"
              onClick={() => {
                setSelectedClass(null);
                setShowDefault(true);
              }}
            >
              Exit
            </button>
          </div>
        )}
      </div>
      <div className="ClassPanel">
        {selectedClass === "Giant" && (
          <div className="panel-content">
            <Giant />
            <button
              className="exitbutton"
              onClick={() => {
                setSelectedClass(null);
                setShowDefault(true);
              }}
            >
              Exit
            </button>
          </div>
        )}
      </div>
      <div className="ClassPanel">
        {selectedClass === "WereWolf" && (
          <div className="panel-content">
            <WereWolf />
            <button
              className="exitbutton"
              onClick={() => {
                setSelectedClass(null);
                setShowDefault(true);
              }}
            >
              Exit
            </button>
          </div>
        )}
      </div>
      <div className="ClassPanel">
        {selectedClass === "Android" && (
          <div className="panel-content">
            <Android />
            <button
              className="exitbutton"
              onClick={() => {
                setSelectedClass(null);
                setShowDefault(true);
              }}
            >
              Exit
            </button>
          </div>
        )}
      </div>
      <div className="ClassPanel">
        {selectedClass === "Valkyrie" && (
          <div className="panel-content">
            <Valkyrie />
            <button
              className="exitbutton"
              onClick={() => {
                setSelectedClass(null);
                setShowDefault(true);
              }}
            >
              Exit
            </button>
          </div>
        )}
      </div>
      <div className="ClassPanel">
        {selectedClass === "DemiGod" && (
          <div className="panel-content">
            <DemiGod />
            <button
              className="exitbutton"
              onClick={() => {
                setSelectedClass(null);
                setShowDefault(true);
              }}
            >
              Exit
            </button>
          </div>
        )}
      </div>
      <div className="ClassPanel">
        {selectedClass === "Satyr" && (
          <div className="panel-content">
            <Satyr />
            <button
              className="exitbutton"
              onClick={() => {
                setSelectedClass(null);
                setShowDefault(true);
              }}
            >
              Exit
            </button>
          </div>
        )}
      </div>
      <div className="ClassPanel">
        {selectedClass === "Witch" && (
          <div className="panel-content">
            <Witch />
            <button
              className="exitbutton"
              onClick={() => {
                setSelectedClass(null);
                setShowDefault(true);
              }}
            >
              Exit
            </button>
          </div>
        )}
      </div>
      <div className="ClassPanel">
        {selectedClass === "Ranger" && (
          <div className="panel-content">
            <Ranger />
            <button
              className="exitbutton"
              onClick={() => {
                setSelectedClass(null);
                setShowDefault(true);
              }}
            >
              Exit
            </button>
          </div>
        )}
      </div>
      <div className="ClassPanel">
        {selectedClass === "Centaur" && (
          <div className="panel-content">
            <Centaur />
            <button
              onClick={() => {
                setSelectedClass(null);
                setShowDefault(true);
              }}
              id="exitbutton"
            >
              Exit
            </button>
          </div>
        )}
      </div>
      <div className="ClassPanel">
        {showDefault && (
          <div className="panel-content">
            {party.map((member, index) => (
              <li
                key={index}
                className="defaultlist"
                style={{
                  backgroundImage: `url(${member.Icon})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "white", // optional, for readability on background
                }}
              >
                {member.name} <br />
                <br />
                {member.role}
                <br />
                <button className="rb" onClick={() => removeFromParty(index)}>
                  ❌ Remove
                </button>
              </li>
            ))}
            <h1 className="partymessage">Your Selected Party</h1>

            {fullParty && (
              <div>
                <h2>Party Is Full</h2>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamIndex;
