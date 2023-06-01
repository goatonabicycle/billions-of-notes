import React from "react";

const Slider = ({ id, min, max, step, value, onChange, label }) => {
  return (
    <div className="selectContainer">
      <div
        key={id}
        className="selectWrapper">
        <label
          htmlFor={id}
          className="selectLabel">
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
    </div>
  );
};

export default Slider;
