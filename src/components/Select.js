import React from "react";
import styles from "./Select.module.css";

function Select(props) {
  const handleChange = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <div className={styles.selectContainer}>
      <div
        key={props.id}
        className={styles.selectWrapper}>
        <label
          htmlFor={props.id}
          className={styles.selectLabel}>
          {props.label}
        </label>
        <select
          id={props.id}
          className={styles.selectElement}
          onChange={handleChange}
          value={props.selectedValue}>
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
