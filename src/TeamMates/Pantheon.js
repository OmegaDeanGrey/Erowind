import React, { useEffect, useState } from "react";
import "./Pantheon.css";

function Pantheon() {
  const [pantheonMembers, setPantheonMembers] = useState([]);
  const [confirmingIndex, setConfirmingIndex] = useState(null);
  const [fadingIndex, setFadingIndex] = useState(null);

  useEffect(() => {
    const storedPantheon = JSON.parse(localStorage.getItem("pantheon")) || [];
    setPantheonMembers(storedPantheon);
  }, []);

  // ---- SEND TO BATTLE ----
  const sendToBattle = (member) => {
    const party = JSON.parse(localStorage.getItem("party")) || [];

    // OPTIONAL: party size limit
    // if (party.length >= 6) {
    //   alert("Your party is full.");
    //   return;
    // }

    const updatedParty = [...party, member];
    const updatedPantheon = pantheonMembers.filter((m) => m.id !== member.id);

    localStorage.setItem("party", JSON.stringify(updatedParty));
    localStorage.setItem("pantheon", JSON.stringify(updatedPantheon));

    setPantheonMembers(updatedPantheon);
  };

  // ---- RETIRE HERO ----
  // const retireHero = (member) => {
  //   const confirmed = window.confirm(
  //     `Are you sure you want to retire ${member.name}?\nThis cannot be undone.`
  //   );

  //   if (!confirmed) return;

  //   const updatedPantheon = pantheonMembers.filter((m) => m.id !== member.id);

  //   localStorage.setItem("pantheon", JSON.stringify(updatedPantheon));
  //   setPantheonMembers(updatedPantheon);
  // };
  const confirmRetire = (index) => {
    setFadingIndex(index);

    setTimeout(() => {
      const updated = pantheonMembers.filter((_, i) => i !== index);
      setPantheonMembers(updated);
      localStorage.setItem("pantheon", JSON.stringify(updated));

      setConfirmingIndex(null);
      setFadingIndex(null);
    }, 600); // matches CSS fade duration
  };

  return (
    <div className="pantheon-container">
      <h2 id="pantheon-title">Pantheon of Heroes</h2>

      {pantheonMembers.length === 0 ? (
        <p>No heroes have been sent to the Pantheon yet.</p>
      ) : (
        <div className="pantheon-list">
          {pantheonMembers.map((member, index) => (
            <div
              key={index}
              className="pantheon-card"
              style={{
                backgroundImage: `url(${member.Icon})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "white",
              }}
            >
              {/* <div className="pantheon-info">
                <h2>{member.name}</h2>
                <p>Role: {member.role}</p>
                <p>
                  HP: {member.currentHP} / {member.maxHP}
                </p>
                <p>EXP: {member.exp}</p>
              </div> */}

              {/* <div
                className={`pantheon-card ${
                  fadingIndex === index ? "fade-out" : ""
                }`}
                style={{
                  backgroundImage: `url(${member.Icon})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              > */}
              <div className="pantheon-info">
                <h2>{member.name}</h2>
                <p>Role: {member.role}</p>
                <p>
                  HP: {member.currentHP} / {member.maxHP}
                </p>
                <p>EXP: {member.exp}</p>
              </div>

              {confirmingIndex === index ? (
                <div className="retire-confirm">
                  <p>Are you sure you want to say goodbye?</p>
                  <button onClick={() => confirmRetire(index)}>Yes</button>
                  <button onClick={() => setConfirmingIndex(null)}>No</button>
                </div>
              ) : (
                <>
                  <button id="PanButton">Send to Battle</button>
                  <br />
                  <button
                    id="PanButton"
                    onClick={() => setConfirmingIndex(index)}
                  >
                    Retire
                  </button>
                </>
              )}
            </div>
            // </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Pantheon;
