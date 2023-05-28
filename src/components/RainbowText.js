import React from "react";
import "./RainbowText.css";

const RainbowText = ({ text, tempo }) => {
  const animationDuration = 61 / tempo;
  const animationDelayConstant = 0.5; // You might want to adjust this constant for the best visual effect

  return (
    <h1>
      {text.split("").map((char, index) => (
        <span
          key={index}
          style={{
            animationDuration: `${animationDuration}s`,
            animationDelay: `${index * animationDelayConstant}s`,
          }}
          className="rainbow-text">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
};

export default RainbowText;
