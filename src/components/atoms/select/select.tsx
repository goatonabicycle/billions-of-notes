import React, { memo, ChangeEvent, useMemo } from "react";
import "./select.css";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  name: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  selectedValue: string;
  options: Option[];
}

const Select: React.FC<SelectProps> = memo(
  ({ id, name, label, onChange, selectedValue, options }) => {
    const memoizedOptions = useMemo(() => {
      return options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ));
    }, [options]);

    return (
      <div className="selectContainer">
        <div key={id} className="selectWrapper">
          <label htmlFor={id} className="selectLabel">
            {label}
          </label>
          <select
            id={id}
            name={name}
            className="selectElement"
            onChange={onChange}
            value={selectedValue}
          >
            {memoizedOptions}
          </select>
        </div>
      </div>
    );
  }
);

export default Select;
