import React, { useRef, useEffect, useState } from "react";

const Slider = ({ id, min, max, step, value, onChange, label, editable }) => {
  const mirrorRef = useRef(null);
  const [inputWidth, setInputWidth] = useState("0px");

  useEffect(() => {
    if (mirrorRef.current) {
      setInputWidth(`${mirrorRef.current.offsetWidth}px`);
    }
  }, [value]);

  return (
    <div className="selectContainer">
      <div
        key={id}
        className="selectWrapper">
        <label
          htmlFor={id}
          className="selectLabel">
          {label}:{" "}
          <input
            style={{ width: inputWidth }}
            className="tempo-input"
            disabled={!editable}
            value={value}
            onChange={onChange}
          />
          <div
            ref={mirrorRef}
            style={{
              position: "absolute",
              top: "-9999px",
              left: "-9999px",
              whiteSpace: "nowrap",
            }}>
            {value}
          </div>
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
