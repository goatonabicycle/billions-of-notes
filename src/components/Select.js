import React, { memo } from "react";

import "./Select.css";

const Select = memo(function Select({
  id,
  label,
  onChange,
  selectedValue,
  options,
}) {
  return (
    <div className="selectContainer">
      <div
        key={id}
        className="selectWrapper">
        <label
          htmlFor={id}
          className="selectLabel">
          {label}
        </label>
        <select
          id={id}
          className="selectElement"
          onChange={(event) => onChange(event.target.value)}
          value={selectedValue}>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});

export default Select;
