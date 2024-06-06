import React from "react";
import "./RainbowText.css";

const RainbowText = ({ text, tempo }) => {
  if (!text) return null;

  if (tempo === 0) tempo = 100000;
  const animationDuration = 500 / tempo;
  const animationDelayConstant = 0.5;

  return (
    <span>
      {text.split("").map((char, index) => (
        <span
          key={index}
          style={{
            animationDuration: `${animationDuration}s`,
            animationDelay: `${index * animationDelayConstant}s`,
            textShadow:
              "-1px 0 #d8fcfc98, 0 1px #d8fcfc98, 1px 0 #d8fcfc98, 0 -1px #d8fcfc98",
          }}
          className="rainbow-text"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

export default RainbowText;
