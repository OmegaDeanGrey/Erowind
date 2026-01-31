import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Items.css";

function Items() {
  const [keyItems, setKeyItems] = useState([]);
  const [consumables, setConsumables] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const allKeys = Object.keys(localStorage);

    // Define item groups
    const keyItemKeys = [
      "goblinKingCrown",
      "elvenEmblem",
      "steelArmor",
      "ironHelm",
      "magicRing",
    ];
    const consumableKeys = ["potion", "revive", "megaPotion"];

    // Filter for matching keys
    const filteredKeyItems = allKeys.filter((key) => keyItemKeys.includes(key));
    const filteredConsumables = allKeys.filter((key) =>
      consumableKeys.includes(key)
    );

    // Parse items
    const parseItem = (key) => {
      const raw = localStorage.getItem(key);
      let value;
      try {
        value = JSON.parse(raw);
      } catch {
        value = raw;
      }

      return {
        key,
        name: value?.name || key,
        description:
          value?.description || "A mysterious item of unknown origin.",
        image: value?.image || `/${key}.png`,
        category: keyItemKeys.includes(key) ? "Key Item" : "Consumable",
      };
    };

    const parsedItems = [
      ...filteredKeyItems.map(parseItem),
      ...filteredConsumables.map(parseItem),
    ];
    console.log(parsedItems);
    const parsedKeyItems = filteredKeyItems.map(parseItem);
    const parsedConsumables = filteredConsumables.map(parseItem);

    setKeyItems(parsedKeyItems);
    setConsumables(parsedConsumables);
  }, []);

  return (
    <div id="item">
      <h1 id="itemTitle">Inventory</h1>

      <div className="items-grid">
        {/* LEFT COLUMN — KEY ITEMS */}
        <div className="items-column">
          <h2 className="column-title">Key Items</h2>

          <ul className="itemList">
            {keyItems.length > 0 ? (
              keyItems.map((item) => (
                <li key={item.key} className="item-entry">
                  <div className="item-card key-item">
                    <img src={item.image} className="item-image" />
                    <div>
                      <strong>{item.name}</strong>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="empty">No key items</li>
            )}
          </ul>
        </div>

        {/* RIGHT COLUMN — CONSUMABLES */}
        <div className="items-column">
          <h2 className="column-title">Items</h2>

          <ul className="itemList">
            {consumables.length > 0 ? (
              consumables.map((item) => (
                <li key={item.key} className="item-entry">
                  <button className="item-card consumable">
                    <img src={item.image} className="item-image" />
                    <div>
                      <strong>{item.name}</strong>
                      <p>{item.description}</p>
                    </div>
                  </button>
                </li>
              ))
            ) : (
              <li className="empty">No consumables</li>
            )}
          </ul>
          <button id="itemgoback" onClick={() => navigate("/Party")}>
            View Team
          </button>
        </div>
      </div>

      <button id="itemgoback" onClick={() => navigate("/OnlyCharacter")}>
        View Character
      </button>
    </div>
  );
}

export default Items;
