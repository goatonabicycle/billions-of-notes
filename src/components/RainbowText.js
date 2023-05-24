import React from "react";
import "./RainbowText.css";

const RainbowText = ({ text }) => {
  return (
    <h1>
      {text.split("").map((char, index) => (
        <span
          key={index}
          style={{ animationDelay: `${index * 0.2}s` }}
          className="rainbow-text">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
};

export default RainbowText;
