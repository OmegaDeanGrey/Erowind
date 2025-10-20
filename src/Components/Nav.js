import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./Nav.css";

import HBackground from "./Home/HBackground.js";

import Start from "./Power/Start.js";
import Character from "./Character/Character.js";
import TrialsIndex from "./Trials/Index.js";
import TrialOne from "./Trials/TrialOne.js";
import Fighter from "../TeamMates/Fighter.js";
import TeamIndex from "../TeamMates/TeamIndex.js";
import Party from "../TeamMates/Party.js";
import Cleric from "../TeamMates/Cleric.js";
import Mage from "../TeamMates/Mage.js";
import Quiz from "./Trials/Quiz.js";
import TrialTwo from "./Trials/TrialTwo.js";
import TrialThree from "./Trials/TrialThree.js";
import TrialFour from "./Trials/TrialFour.js";
import TrialFive from "./Trials/TrialFive.js";
import TrialSix from "./Trials/TrialSix.js";
import Rogue from "../TeamMates/Rogue.js";
import Fairy from "../TeamMates/Fairy.js";
import Vamp from "../TeamMates/Vamp.js";
import Elemental from "../TeamMates/Elemental.js";
import Giant from "../TeamMates/Giant.js";
import Summoner from "../TeamMates/Summoner.js";
import WereWolf from "../TeamMates/WereWolf.js";
import Android from "../TeamMates/Android.js";
import DemiGod from "../TeamMates/DemiGod.js";
import Valkyrie from "../TeamMates/Valkyrie.js";
import EE from "./Home/EE.js";
import EE2 from "./Home/EE2.js";
import OnlyCharacter from "./Character/OnlyCharacter.js";
import Shop from "./Character/Shop.js";
import Bressone from "./Battle/Velonia/Bressone.js";
import OnlyInventory from "./Character/OnlyInventory.js";
import BattleHome from "./Battle/BattleHome.js";
import WesternWood from "./Battle/Velonia/WesternWood.js";
import Sableheim from "./Battle/Velonia/Sableheim.js";
import Dvasheld from "./Battle/Velonia/Dvasheld.js";
import CounselRoom from "./Battle/Velonia/CounselRoom.js";
import ElvenKingdom from "./Battle/Velonia/ElvenKingdom.js";
import BattleField from "./Battle/Battlefield.js";
import BressoneBattle from "./Battle/Velonia/BressonBattle.js";
import WesternWoodBattle from "./Battle/Velonia/WesternWoodBattle.js";
import DvasheldBattle from "./Battle/Velonia/DvasheldBattle.js";
import Items from "./Character/Items.js";

function Navbar() {
  const [showCharacterLink, setShowCharacterLink] = useState(false);
  const [showTrialsLink, setShowTrialsLink] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0); // Force re-render

  useEffect(() => {
    const savedStats = localStorage.getItem("characterStats");
    setShowCharacterLink(!!savedStats);

    const trialsEnabled = localStorage.getItem("trialsEnabled");
    setShowTrialsLink(trialsEnabled === "true");
  }, [updateTrigger]); // Re-run when updateTrigger changes

  const triggerUpdate = () => setUpdateTrigger((prev) => prev + 1);

  return (
    <>
      <nav className="navbar">
        <Link to="/THC">
          <h1 className="navbar-logo">Erowind</h1>
        </Link>
        <div id="links">
          <ul className="navbar-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            {showCharacterLink && (
              <li>
                <Link to="/OnlyCharacter">Character</Link>
              </li>
            )}

            <li>
              <Link to="/Items">Item Bag</Link>
            </li>

            {showTrialsLink && (
              <li>
                <Link to="/Trials">Trials</Link>
              </li>
            )}
          </ul>
        </div>
        <div>
          <ul className="navbar-links">
            <li>
              <Link to="/TeamIndex">Select Team</Link>
            </li>
            <li>
              <Link to="/Party">View Party</Link>
            </li>
            <li>
              <Link to="/BattleHome">Map</Link>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HBackground />} />

        <Route path="/Start/Home" element={<HBackground />} />
        <Route
          path="/Start"
          element={
            <Start
              onSaveAndQuit={() => {
                console.log("Character progress saved. Exiting...");
              }}
              onCompletion={() => {
                console.log("Character creation complete!");
                triggerUpdate(); // Trigger Navbar update
              }}
            />
          }
        />
        <Route path="/Character" element={<Character />} />
        <Route path="/OnlyCharacter" element={<OnlyCharacter />} />
        <Route path="/Trials" element={<TrialsIndex />} />
        <Route path="/TrialOne" element={<TrialOne />} />
        <Route path="/Fighter" element={<Fighter />} />
        <Route path="/Cleric" element={<Cleric />} />
        <Route path="/Mage" element={<Mage />} />
        <Route path="/Rogue" element={<Rogue />} />
        <Route path="/Summoner" element={<Summoner />} />
        <Route path="/Fairy" element={<Fairy />} />
        <Route path="/Vamp" element={<Vamp />} />
        <Route path="/Elemental" element={<Elemental />} />
        <Route path="/Giant" element={<Giant />} />
        <Route path="/Android" element={<Android />} />
        <Route path="/Valkyrie" element={<Valkyrie />} />
        <Route path="/DemiGod" element={<DemiGod />} />
        <Route path="/WereWolf" element={<WereWolf />} />
        <Route path="/TeamIndex" element={<TeamIndex />} />
        <Route path="/Party" element={<Party />} />
        <Route path="/TrialTwo" element={<TrialTwo />} />
        <Route path="/Quiz" element={<Quiz />} />
        <Route path="/TrialThree" element={<TrialThree />} />
        <Route path="/TrialFour" element={<TrialFour />} />
        <Route path="/TrialFive" element={<TrialFive />} />
        <Route path="/TrialSix" element={<TrialSix />} />
        <Route path="/EE" element={<EE />} />
        <Route path="/EE2" element={<EE2 />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Bressone" element={<Bressone />} />
        <Route path="/OnlyInventory" element={<OnlyInventory />} />
        <Route path="/Items" element={<Items />} />
        <Route path="/BattleHome" element={<BattleHome />} />
        <Route path="/WesternWood" element={<WesternWood />} />
        <Route path="/Sableheim" element={<Sableheim />} />
        <Route path="/Dvasheld" element={<Dvasheld />} />
        <Route path="/CounselRoom" element={<CounselRoom />} />
        <Route path="/ElvenKingdom" element={<ElvenKingdom />} />
        <Route path="/BattleField" element={<BattleField />} />
        <Route path="/BressoneBattle" element={<BressoneBattle />} />
        <Route path="/WesternWoodBattle" element={<WesternWoodBattle />} />
        <Route path="/DvasheldBattle" element={<WesternWoodBattle />} />
      </Routes>
    </>
  );
}

export default Navbar;
