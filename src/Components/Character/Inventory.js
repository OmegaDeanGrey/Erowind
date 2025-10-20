import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Inventory() {
  const [helmet, setHelmet] = useState("");
  const [armor, setArmor] = useState("");
  const [accessory, setAccessory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const headgear = localStorage.getItem("headgear");
    if (headgear) {
      setHelmet(headgear);
    }
    const mail = localStorage.getItem("mail");
    if (mail) {
      setArmor(mail);
    }
    const accessory = localStorage.getItem("accessory");
    if (accessory) {
      setAccessory(accessory);
    }
  }, []);

  const hero = {
    helmet,
    armor,
    accessory,
  };

  return (
    <div id="inventory">
      <div id="inventoryTitle">Gear</div>
      <ul id="inventoryList">
        <li className="invitem">Helmet - {hero.helmet}</li>
        <li className="invitem">Armor - {hero.armor}</li>
        <li className="invitem">Accessory - {hero.accessory}</li>
      </ul>
      <button id="inventgoback" onClick={() => navigate("/Items")}>
        View Items
      </button>
    </div>
  );
}
export default Inventory;
