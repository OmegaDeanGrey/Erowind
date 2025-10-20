// BattleField.js
import React from "react";
import "./Battle.css";
import { useNavigate } from "react-router-dom";

function BattleField({
  players = [],
  enemies = [],
  animations = [],
  activeActorId,
}) {
  const navigate = useNavigate(null);
  // render 6 slots for each side (players / enemies)
  const renderGrid = (team, isEnemy = false) => {
    const slots = Array.from({ length: 6 }, (_, i) => team[i] || null);

    return slots.map((member, index) => {
      const id = member?.id || `slot-${index}`;
      const isAttacking = activeActorId === id;

      // pick the right background
      const bgImage = member ? (isEnemy ? member.portrait : member.Icon) : null;

      return (
        <div
          key={id}
          id={id}
          className={`grid-cell ${isAttacking ? "attacking" : ""}`}
          style={{
            backgroundImage: bgImage ? `url(${bgImage})` : "none",
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

          {/* move-name bubble (above attacker only) */}
          {animations.some((a) => a.actorId === id) && (
            <div className="move-bubble">
              {animations.find((a) => a.actorId === id)?.moveName || "Move"}
            </div>
          )}

          {/* floating numbers (only above TARGET) */}
          {animations
            .filter((a) => a.targetId === id) // only target
            .map((anim) => (
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
      <div className="grid player-side">{renderGrid(players, false)}</div>
      <div className="grid enemy-side">{renderGrid(enemies, true)}</div>
    </div>
  );
}

export default BattleField;
