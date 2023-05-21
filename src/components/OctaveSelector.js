import React from "react";

const OctaveSelector = ({ selectedOctaves, setSelectedOctaves }) => {
  const handleChange = (event) => {
    setSelectedOctaves(parseInt(event.target.value));
  };

  return (
    <div className="octave-selector">
      Octaves:
      <input
        type="range"
        min="1"
        max="8"
        value={selectedOctaves}
        onChange={handleChange}
      />
      {selectedOctaves}
    </div>
  );
};

export default OctaveSelector;
