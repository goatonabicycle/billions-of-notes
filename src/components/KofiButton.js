import React, { useState } from "react";
import "./KofiButton.css";

// This component is special because it is a button that also opens a modal.
const KofiButton = () => {
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
        Buy me a coffee
      </button>
      {modalIsOpen && (
        <div
          className="kofi-modal-overlay"
          onClick={closeModal}>
          <div
            className="kofi-modal-content"
            onClick={(e) => e.stopPropagation()}>
            <iframe
              id="kofiframe"
              src="https://ko-fi.com/goatonabicycle/?hidefeed=true&widget=true&embed=true&preview=true"
              style={{
                border: "none",
                width: "100%",
                height: "100%",
              }}
              title="goatonabicycle"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default KofiButton;
