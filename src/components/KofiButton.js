import React, { useState } from "react";
import "./KofiButton.css";

import IconButton from "./IconButton";
import { BuyCoffeeIcon } from "./Icons";

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
        className="buy-a-coffee"
        onClick={openModal}>
        Buy me a coffee
      </button>
      {modalIsOpen && (
        <div
          className="modalOverlay"
          onClick={closeModal}>
          <div
            className="modalContent"
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
