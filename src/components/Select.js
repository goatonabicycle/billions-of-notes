import React from "react";
import "./Select.css";

function Select(props) {
  const handleChange = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <div className="selectContainer">
      <div
        key={props.id}
        className="selectWrapper">
        <label
          htmlFor={props.id}
          className="selectLabel">
          {props.label}
        </label>
        <select
          id={props.id}
          className="selectElement"
          onChange={handleChange}
          value={props.selectedValue || ""}>
          {props.options.map((option) => (
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
}

export default Select;
