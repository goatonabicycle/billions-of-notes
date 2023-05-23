import React, { useState } from "react";
import "./ClickFirst.css";

const Overlay = ({ onClick }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(false);
    onClick();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="overlay"
      onClick={handleClick}>
      <div className="overlay-content">
        <h1>Hello!</h1>
        <p>Let's click somewhere to get things going!</p>
      </div>
    </div>
  );
};

export default Overlay;
