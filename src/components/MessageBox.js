import React from "react";

const MessageBox = ({ showWhen, message }) => {
  if (!showWhen) return null;

  return <div className="message-box">{message}</div>;
};

export default MessageBox;
