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
            <div className="question">What is this?</div>
            <div className="answer">This is a website.</div>
            <div className="question">Does it use AI? </div>
            <div className="answer">Not even a little bit</div>
            <div className="question">What about bitcoins?</div>
            <div className="answer">Even less so</div>
            <div className="question">What's the point?</div>
            <div className="answer">
              This website randomly generates notes for you.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExplainButton;
