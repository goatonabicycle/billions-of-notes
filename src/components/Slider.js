import React from "react";

const Slider = ({ id, min, max, step, value, onChange, label }) => {
  return (
    <div>
      <label htmlFor={id}>{label}:</label>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
      {value}
    </div>
  );
};

export default Slider;
