import React from "react";

import "./ShowMeSelector.css";

const ShowMeSelector = ({ selectedPanelsToShow, setSelectedPanelsToShow }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    console.log(event.target.value);
    if (event.target.checked) {
      setSelectedPanelsToShow((prevPanels) => [...prevPanels, value].sort());
    } else {
      setSelectedPanelsToShow((prevPanels) =>
        prevPanels.length > 1
          ? prevPanels.filter((panel) => panel !== value)
          : prevPanels
      );
    }
  };

  return (
    <div className="show-me-selector">
      <label>Show me:</label>
      <div className="doodle-border">
        {["Guitar", "Piano Roll", "Piano", "Bass Guitar"].map((panel) => (
          <span
            className="show-me-selector-item"
            key={panel}>
            <input
              type="checkbox"
              value={panel}
              checked={selectedPanelsToShow.includes(panel)}
              onChange={handleChange}
            />
            {panel}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ShowMeSelector;
