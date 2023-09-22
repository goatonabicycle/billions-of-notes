import React, { useCallback } from "react";
import "./OctaveSelector.css";
import { OCTAVES } from "../useful";

const OctaveSelector = ({ inputState, setInputState }) => {
  const handleChange = (event) => {
    const value = parseInt(event.target.value);

    if (event.target.checked) {
      setInputState(() => ({
        ...inputState,
        octaves: [...inputState.octaves, value].sort(),
      }));
    } else {
      setInputState(() => ({
        ...inputState,
        octaves:
          inputState.octaves.length > 1
            ? inputState.octaves.filter((octave) => octave !== value)
            : inputState.octaves,
      }));
    }
  };

  return (
    <div className="octave-selector">
      <label>Octaves:</label>
      <div className="doodle-border">
        {OCTAVES.map((octave) => (
          <span
            className="octave-selector-item"
            key={octave}>
            <input
              type="checkbox"
              value={octave}
              checked={inputState.octaves.includes(octave)}
              onChange={handleChange}
            />
            {octave}
          </span>
        ))}
      </div>
    </div>
  );
};

export default OctaveSelector;
