import React from "react";
import "./ShowMeSelector.css";

const ShowMeSelector = ({ selectedPanelsToShow, setSelectedPanelsToShow }) => {
  const panels = ["Guitar", "Piano Roll", "Piano", "Bass Guitar"];

  const handleChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedPanelsToShow((prevPanels) => [...prevPanels, value]);
    } else {
      setSelectedPanelsToShow((prevPanels) =>
        prevPanels.filter((panel) => panel !== value)
      );
    }
  };

  return (
    <div className="show-me-selector">
      <label>Show me:</label>
      <div className="doodle-border">
        {panels.map((panel) => (
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
