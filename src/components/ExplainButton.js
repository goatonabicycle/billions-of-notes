import React, { useState } from "react";
import "./ExplainButton.css";

const ExplainButton = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <button
        className="buy-a-coffee"
        onClick={openModal}>
        Wtf is this?
      </button>
      {modalIsOpen && (
        <div
          className="explain-modal-overlay"
          onClick={closeModal}>
          <div
            className="explain-modal-content"
            onClick={(e) => e.stopPropagation()}>
            Hi! <br />
            <br />
            What is this? <br />
            This is a website
            <br />
            <br />
            Does it use AI? <br />
            Not at all.
            <br />
            <br />
            Does it use Bitcoins? <br />
            Not at all.
            <br />
            <br />
          </div>
        </div>
      )}
    </>
  );
};

export default ExplainButton;
