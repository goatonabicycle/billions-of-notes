import React, { useState, useRef } from "react";
import "./Knob.css";

const Knob = ({ min = 0, max = 100, initialValue = 50, onChange }) => {
  const [value, setValue] = useState(initialValue);
  const knobRef = useRef(null);

  const handleMouseMove = (e) => {
    if (knobRef.current) {
      const rect = knobRef.current.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const deltaY = centerY - e.clientY;
      const newValue = Math.min(max, Math.max(min, value + deltaY / 2));
      setValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  const handleMouseDown = () => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="knob-container">
      <div className="knob-wrapper">
        <div className="knob-minus">-</div>
        <div
          ref={knobRef}
          className="knob"
          onMouseDown={handleMouseDown}
          style={{
            transform: `rotate(${(value / max) * 270 - 135}deg)`,
          }}>
          <div className="ticks">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="tick"></div>
            ))}
          </div>
        </div>
        <div className="knob-plus">+</div>
      </div>
    </div>
  );
};

export default Knob;
