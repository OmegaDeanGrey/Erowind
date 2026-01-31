// src/Scenes/CounselRoom.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useParty } from "../../Context/PartyContext.js";
import DialogRoom from "../../Utility/DialogRoom";

function CounselRoom() {
  const navigate = useNavigate();
  const { party } = useParty();

  const dvasheldFirstBattleDone =
    JSON.parse(localStorage.getItem("dvasheldFirstBattleDone")) || false;

  const dialogue = !dvasheldFirstBattleDone
    ? [
        {
          text: "Welcome to the Kingdom Under the Falls...",
          name: "Ahn DaQuin",
          portrait: "/DwarfKing.png",
        },
        {
          text: "Evils linger beyond our Fortress walls.",
          name: "Ahn DaQuin",
        },
        {
          text: "Will you help us Hero?",
          name: "Ahn DaQuin",
          choices: [
            { label: "I am with you!", next: 3 },
            { label: "I do not yet trust you.", next: 4 },
          ],
        },
        { text: "Prepare for battle!", name: "Hero" },
        { text: "Gather more information first.", name: "Hero" },
      ]
    : [
        {
          text: "You have proven your strength.",
          name: "Ahn DaQuin",
          portrait: "/DwarfKing.png",
        },
        {
          text: "The Mountain Pass now stands open to you.",
          name: "Ahn DaQuin",
        },
        {
          text: "Beyond it lies the Fairy Kingdom of Sableheim.",
          name: "Ahn DaQuin",
        },
        {
          text: "Will your party travel through the Mountain Pass?",
          name: "Ahn DaQuin",
          choices: [
            { label: "Travel to Sableheim", next: "SABLEHEIM" },
            { label: "Remain in Dvasheld", next: "END" },
          ],
        },
      ];

  return (
    <div id="CounselRoomOut">
      <div id="CRTitle">Counsel Room</div>

      <DialogRoom
        dialogue={dialogue}
        background="/Dvashold.png"
        onChoice={(choice) => {
          if (choice.next === "SABLEHEIM") navigate("/Sableheim");
          if (choice.next === "END") navigate("/Dvasheld");
        }}
        onComplete={() => navigate("/Dvasheld")}
      />
    </div>
  );
}

export default CounselRoom;
