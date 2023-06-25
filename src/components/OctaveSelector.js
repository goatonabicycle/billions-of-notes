import React from "react";

import "./OctaveSelector.css";

const OctaveSelector = ({ selectedOctaves, setSelectedOctaves }) => {
  const handleChange = (event) => {
    const value = parseInt(event.target.value);

    if (event.target.checked) {
      setSelectedOctaves((prevOctaves) => [...prevOctaves, value].sort());
    } else {
      setSelectedOctaves((prevOctaves) =>
        prevOctaves.filter((octave) => octave !== value)
      );
    }
  };

  return (
    <div className="octave-selector">
      <label>Octaves:</label>
      <div className="doodle-border">
        {[2, 3, 4, 5].map((octave) => (
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
