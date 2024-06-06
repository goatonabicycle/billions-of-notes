import React, { memo } from "react";

const IconButton = memo(function IconButton({ icon, onClick, text }) {
  return (
    <span className="icon-button">
      <button onClick={onClick} className="rainbow-button">
        {icon} <span className="icon-button-text">{text}</span>
      </button>
    </span>
  );
});

export default IconButton;
