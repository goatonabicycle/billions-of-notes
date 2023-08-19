import React, { useCallback } from "react";
import "./OctaveSelector.css";
import { OCTAVES } from "../useful";

const OctaveSelector = ({ selectedOctaves, setSelectedOctaves }) => {
  const handleChange = useCallback(
    (event) => {
      const value = parseInt(event.target.value);

      if (event.target.checked) {
        setSelectedOctaves((prevOctaves) => [...prevOctaves, value].sort());
      } else {
        setSelectedOctaves((prevOctaves) =>
          prevOctaves.length > 1
            ? prevOctaves.filter((octave) => octave !== value)
            : prevOctaves
        );
      }
    },
    [setSelectedOctaves]
  );

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
              checked={selectedOctaves.includes(octave)}
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
