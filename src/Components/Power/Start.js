import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Power.css";
import { generateHeroImage } from "../Utility/HeroImageGenerator.js";

const Start = ({ onCompletion, onSaveAndQuit }) => {
  const steps = [
    {
      label: "Race",
      choices: [
        {
          label: "Human",
          related: [
            { label: "Barbarian" },
            { label: "Tribesman" },
            { label: "Plainsman" },
            { label: "Eastern" },
          ],
        },
        {
          label: "Elf",
          related: [
            {
              label: "Sylvan Elf",
              related: [
                { label: "Great Hills Elf" },
                { label: "Western Wood Elf" },
                { label: "Valley Dells Elf" },
              ],
            },
            {
              label: "Drow Elf",
              related: [
                {
                  label: "Mountain Drow",
                },
                {
                  label: "Hill Drow",
                },
              ],
            },
          ],
        },
        {
          label: "Dwarf",
          related: [{ label: "Mountain Dwarf" }, { label: "Hill Dwarf" }],
        },
        {
          label: "Halfling",
          related: [{ label: "Kender" }, { label: "Hobbit" }],
        },
        { label: "Orc" },
      ],
    },
    {
      label: "Class",
      choices: [
        {
          label: "Fighter",
          related: [
            { label: "Samurai" },
            { label: "Wrestler" },
            { label: "Paladin" },
            { label: "Knight" },
          ],
        },
        { label: "Thief", related: [{ label: "Scout" }, { label: "Ninja" }] },
        {
          label: "Mage",
          related: [
            { label: "MagiWhite" },
            { label: "MagiBlack" },
            { label: "MagiRed" },
          ],
        },
        { label: "Cleric", related: [{ label: "Priest" }, { label: "Monk" }] },
        {
          label: "Ranger",
          related: [{ label: "BeastMaster" }, { label: "Tracker" }],
        },
      ],
    },
    {
      label: "Element",
      choices: [
        {
          label: "Earth",
          related: [
            { label: "Stone" },
            { label: "Mineral" },
            { label: "Sand" },
          ],
        },
        {
          label: "Water",
          related: [{ label: "Ice" }, { label: "Vitae" }, { label: "Hydro" }],
        },
        {
          label: "Wind",
          related: [
            { label: "Air" },
            { label: "Cloud" },
            { label: "Lightning" },
          ],
        },
        { label: "Fire", related: [{ label: "Volcanic" }, { label: "Pyro" }] },

        { label: "Holy", related: [{ label: "Light" }, { label: "Nimbus" }] },
        { label: "Dark", related: [{ label: "Shadow" }, { label: "Gravity" }] },
        {
          label: "Time",
          related: [{ label: "Manipulator" }, { label: "Traveler" }],
        },
        {
          label: "Celestial",
          related: [{ label: "Luck" }, { label: "Gigas" }],
        },
      ],
    },
  ];

  const [characterName, setCharacterName] = useState("");
  const [characterStats, setCharacterStats] = useState({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentChoices, setCurrentChoices] = useState(steps[0].choices);
  const [isNameStep, setIsNameStep] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const navigate = useNavigate("");

  const handleNameSubmit = (e) => {
    e.preventDefault();
    setCharacterStats((prevStats) => ({
      ...prevStats,
      Name: characterName,
    }));
    setIsNameStep(false);
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("characterStats", JSON.stringify(characterStats));
  };

  const handleChoiceClick = async (choice) => {
    const step = steps[currentStepIndex];

    // prepare updated stats
    const updatedStats = {
      ...characterStats,
      [step.label]: choice.label,
    };

    setCharacterStats(updatedStats);

    if (choice.related && choice.related.length > 0) {
      setCurrentChoices(choice.related);
    } else {
      const nextStepIndex = currentStepIndex + 1;
      if (nextStepIndex < steps.length) {
        setCurrentStepIndex(nextStepIndex);
        setCurrentChoices(steps[nextStepIndex].choices);
      } else {
        setCurrentChoices([]);
        setIsComplete(true);
        localStorage.setItem("shopEnabled", "true");

        setLoadingImage(true);
        const imageUrl = await generateHeroImage({
          race: updatedStats.Race,
          heroClass: updatedStats.Class,
        });

        setCharacterStats((prev) => {
          const newStats = { ...prev, Portrait: imageUrl };
          localStorage.setItem("characterStats", JSON.stringify(newStats));
          return newStats;
        });

        setLoadingImage(false);
      }
    }
  };

  const handleStartOver = () => {
    setCharacterName("");
    setCharacterStats({});
    setCurrentStepIndex(0);
    setCurrentChoices(steps[0].choices);
    setIsNameStep(true);
    setIsComplete(false);
    localStorage.removeItem("characterStats");
    localStorage.removeItem("trialsEnabled");
    localStorage.removeItem("shopEnabled");
    localStorage.removeItem("character");
  };

  return (
    <div id="NameDiv">
      {isComplete ? (
        <div id="StartOut">
          {/* <h1 id="CYC">Tell Us</h1> */}
          <h2 id="CCCMessage">Character Complete!</h2>
          <ul id="StatsAll">
            {Object.entries(characterStats).map(([key, value]) => (
              <li id="Stats" key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>

          {loadingImage ? (
            <p>Generating portrait...</p>
          ) : (
            characterStats.Portrait && (
              <img
                src={characterStats.Portrait}
                alt="Hero Portrait"
                style={{ width: "200px", borderRadius: "10px" }}
              />
            )
          )}

          <div>
            <button
              id="ReadyButton"
              onClick={() => {
                saveToLocalStorage();
                localStorage.setItem("character", "true");
                localStorage.setItem("trialsEnabled", "true");
                onCompletion();
                navigate("/Trials");
              }}
              style={{ margin: "10px" }}
            >
              Ready?
            </button>
            <button
              id="SaveAndQuitButton"
              onClick={() => {
                saveToLocalStorage();
                localStorage.removeItem("trialsEnabled");
                if (onSaveAndQuit) onSaveAndQuit(); // Optional execution
                navigate("./Home");
              }}
              style={{ margin: "10px" }}
            >
              Save & Quit
            </button>
            <button
              id="StartOverButton"
              onClick={handleStartOver}
              style={{ margin: "10px" }}
            >
              Start Over
            </button>
          </div>
        </div>
      ) : isNameStep ? (
        <form onSubmit={handleNameSubmit}>
          <label id="NameLabel">How shall we address you oh brave one?</label>
          <br />
          <input
            id="NameInput"
            type="text"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            required
            placeholder="Enter Name Here  O"
          />

          <br />
          <button id="NameButton" type="submit">
            Confirm
          </button>
        </form>
      ) : (
        <div>
          {currentChoices.length > 0 && (
            <div>
              <h2 className="Title">Select {steps[currentStepIndex].label}</h2>
              {currentChoices.map((choice, index) => (
                <button
                  id="RaceSelectButton"
                  key={index}
                  onClick={() => handleChoiceClick(choice)}
                  style={{ margin: "10px", padding: "10px" }}
                >
                  {choice.label}
                </button>
              ))}
            </div>
          )}
          <div>
            <h3 className="Title">Character Stats</h3>
            <ul>
              {Object.entries(characterStats).map(([key, value]) => (
                <li id="Stat" key={key}>
                  {key}: {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Start;
