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
        className="link-looking-button"
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
            <div className="question">
              Very cool... You should add this cool feature where...{" "}
            </div>
            <div className="answer">
              Please add your ideas{" "}
              <a
                className="dark-link-looking-button"
                href="https://github.com/goatonabicycle/billions-of-notes/issues/new"
                target="_blank"
                rel="noreferrer">
                here
              </a>
              .
            </div>
            <div className="question">Got any cool keyboard shortcuts?</div>
            <div className="answer">
              Sure do! <br />
              <div>p = Pause</div>
              <div>r = Reset</div>
              <div>n = New Notes</div>
              <div>s = Save to MIDI</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExplainButton;
