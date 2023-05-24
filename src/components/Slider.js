import React from "react";

const Slider = ({ id, min, max, step, value, onChange, label }) => {
  return (
    <div>
      <label htmlFor={id}>
        {label}: <br />
        {value}
      </label>
      <br />
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
  );
};

export default Slider;
