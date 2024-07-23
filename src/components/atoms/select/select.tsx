import React, { memo, ChangeEvent } from "react";
import "./select.css";

interface Option {
  value: string;
  label: number | string;
}

interface SelectProps {
  id: string;
  name: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  selectedValue: string;
  options: Option[];
}

const Select: React.FC<SelectProps> = memo(({ id, name, label, onChange, selectedValue, options }) => {
  return (
    <div className="selectContainer">
      <div key={id} className="selectWrapper">
        <label htmlFor={id} className="selectLabel">
          {label}
        </label>
        <select id={id} name={name} className="selectElement" onChange={onChange} value={selectedValue}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});

export default Select;
