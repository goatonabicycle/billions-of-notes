import React from "react";
import "./RainbowText.css";

const RainbowText = ({ text, tempo }) => {
  const animationDelay = 60 / tempo;

  return (
    <h1>
      {text.split("").map((char, index) => (
        <span
          key={index}
          style={{
            animationDuration: `${index * animationDelay}s`,
            animationDelay: `${index * animationDelay}s`,
          }}
          className="rainbow-text">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
};

export default RainbowText;
