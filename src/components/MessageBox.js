import React from "react";

const MessageBox = ({ showWhen, message }) => {
  if (!showWhen) return null;

  return <div className="doodle-border">{message}</div>;
};

export default MessageBox;
