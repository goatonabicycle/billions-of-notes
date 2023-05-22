import React from "react";

const OctaveSelector = ({ selectedOctaves, setSelectedOctaves }) => {
  const handleChange = (event) => {
    setSelectedOctaves(parseInt(event.target.value));
  };

  return (
    <div className="octave-selector">
      Octaves: 3
      <input
        type="range"
        min="3"
        max="5"
        value={selectedOctaves}
        onChange={handleChange}
      />
      {selectedOctaves}
    </div>
  );
};

export default OctaveSelector;
