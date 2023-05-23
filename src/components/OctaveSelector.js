import React from "react";

const OctaveSelector = ({ selectedOctaves, setSelectedOctaves }) => {
  const handleChange = (event) => {
    const value = parseInt(event.target.value);
    setSelectedOctaves(Array.from({ length: value - 2 }, (_, i) => i + 3));
  };

  return (
    <div className="octave-selector">
      Octaves:
      <input
        type="range"
        min="3"
        max="5"
        value={
          selectedOctaves.length
            ? selectedOctaves[selectedOctaves.length - 1]
            : 3
        }
        onChange={handleChange}
      />
      {selectedOctaves?.join(", ")}
    </div>
  );
};

export default OctaveSelector;
