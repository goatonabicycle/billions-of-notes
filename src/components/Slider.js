import React from "react";

const Slider = ({ id, min, max, step, value, onChange, label }) => {
  return (
    <div className="center">
      <label htmlFor={id}>
        {label}: {value}
      </label>
      <div className="slider">
        <input
          type="range"
          id={id}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Slider;
