import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Items.css";

function Items() {
  const [items, setItems] = useState([]);
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
    setItems(parsedItems);
  }, []);

  return (
    <div id="item">
      <div id="itemTitle">Items</div>

      <ul id="itemList">
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.key} id="AttributeListItems" className="item-entry">
              <button className="itembuttons">
                <img
                  src={item.image}
                  // alt={item.name}
                  className="item-image"
                  // style={{ width: "64px", height: "64px", marginRight: "10px" }}
                />
                <div>
                  <strong>{item.name}</strong> <em>({item.category})</em>
                  <p>{item.description}</p>
                </div>
              </button>
            </li>
          ))
        ) : (
          <li>No items found.</li>
        )}
      </ul>

      <button id="itemgoback" onClick={() => navigate("/Character")}>
        View Character
      </button>
    </div>
  );
}

export default Items;
