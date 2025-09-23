import React, { useEffect, useState, useRef } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import DialogBox from "../Utility/DialogBox";

function HBackground() {
  const navigate = useNavigate("");
  const audioRef = useRef(null);

  const [showDialog, setShowDialog] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const dialogSequence = [
    { text: "Welcome to the world of Erowind." },
    { text: "Here, your choices will shape destiny." },
    { text: "Prepare yourself..." },
  ];

  const [dialogIndex, setDialogIndex] = useState(0);

  const handleDialogNext = () => {
    if (dialogIndex < dialogSequence.length - 1) {
      setDialogIndex(dialogIndex + 1);
    } else {
      handleDialogEnd();
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
    }
  }, []);

  const handleNewGame = () => {
    setFadeOut(true); // start fade-to-black
    setTimeout(() => {
      setShowDialog(true); // show dialog after fade
    }, 1000); // matches CSS fade time
  };

  const handleDialogEnd = () => {
    navigate("/Start");
  };

  return (
    <div className={`App ${fadeOut ? "fade-out" : ""}`} id="homeBG">
      {!showDialog ? (
        <>
          <div id="bannerhome">
            <p id="MainTitle">EROWIND</p>
          </div>

          <div id="hbout">
            <button className="homebuttons" onClick={handleNewGame}>
              NEW GAME
            </button>
            <button className="homebuttons">CONTINUE</button>
            <button
              className="homebuttons"
              id="EE"
              onClick={() => navigate("/EE")}
            ></button>
          </div>
        </>
      ) : (
        <DialogBox
          name="Narrator"
          text={dialogSequence[dialogIndex].text}
          onNext={handleDialogNext}
          onLast={handleDialogEnd}
        />
      )}

      <audio id="T1" autoPlay loop controls ref={audioRef}>
        <source src="../Luck.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default HBackground;
