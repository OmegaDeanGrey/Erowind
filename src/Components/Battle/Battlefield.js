// BattleField.js
import React from "react";
import "./Battle.css"; // make sure to include the CSS below into this file or a global CSS

function BattleField({
  players = [],
  enemies = [],
  animations = [],
  activeActorId,
}) {
  const renderGrid = (team) => {
    const slots = Array.from({ length: 6 }, (_, i) => team[i] || null);

    return slots.map((member, index) => {
      const id = member?.id || `slot-${index}`;
      const cellAnims = animations.filter(
        (a) => a.targetId === id || a.actorId === id
      );

      const isAttacking = activeActorId === id;
      return (
        <div
          key={id}
          id={id}
          className={`grid-cell ${isAttacking ? "attacking" : ""}`}
          style={{
            backgroundImage: member?.Icon ? `url(${member.Icon})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            position: "relative",
          }}
        >
          {member ? (
            <>
              <div className="name">{member.name || member.Name}</div>
              <div className="role">{member.role}</div>
              <div className="hp">
                HP: {member.currentHP ?? member.HP}/{member.maxHP ?? member.HP}
              </div>
            </>
          ) : (
            <div className="empty">Empty</div>
          )}

          {/* move-name bubble for actor (if any animation shows actorId === id) */}
          {animations.some((a) => a.actorId === id) && (
            <div className="move-bubble">
              {animations.find((a) => a.actorId === id)?.moveName || "Move"}
            </div>
          )}

          {/* floating numbers for effects that target this slot */}
          {cellAnims.map((anim) => (
            <div
              key={anim.id}
              className={`float-text ${
                anim.type === "damage" ? "damage" : "heal"
              }`}
              style={{ pointerEvents: "none" }}
            >
              {anim.type === "damage" ? `-${anim.value}` : `+${anim.value}`}
            </div>
          ))}
        </div>
      );
    });
  };

  return (
    <div className="battle-field-grid">
      <div className="grid player-side">{renderGrid(players)}</div>
      <div className="grid enemy-side">{renderGrid(enemies)}</div>
    </div>
  );
}

export default BattleField;
