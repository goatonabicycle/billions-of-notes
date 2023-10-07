import React, { useState } from "react";
import { Note, Scale } from "tonal";
import "./WhatScale.css";

function WhatScale() {
  const [notes, setNotes] = useState("");
  const [detectedScales, setDetectedScales] = useState([]);

  const handleInputChange = (e) => {
    const inputNotes = e.target.value
      .split(",")
      .map((note) => Note.simplify(note.trim()));
    setNotes(e.target.value);
    const scales = Scale.detect(inputNotes);
    setDetectedScales(scales);
  };

  const renderScaleNotes = (scaleNotes, inputNotes) => {
    return scaleNotes
      .map((scaleNote) => {
        if (inputNotes.includes(scaleNote)) {
          return (
            <span
              className="containing"
              key={scaleNote}>
              {scaleNote}
            </span>
          );
        } else {
          return <span key={scaleNote}>{scaleNote}</span>;
        }
      })
      .reduce((prev, curr) => [prev, ", ", curr]);
  };

  return (
    <div className="container">
      <h2>What is this scale?</h2>
      <p class="what-scale-explain">
        Input notes below (separated by commas). The <strong>first note</strong>{" "}
        you enter is considered the <strong>tonic</strong> of the scale.
      </p>
      <input
        className="input-box"
        type="text"
        placeholder="Enter notes separated by commas"
        value={notes}
        onChange={handleInputChange}
      />
      {detectedScales.length > 0 && (
        <>
          <div className="results">
            <ul>
              {detectedScales.map((scaleName, index) => {
                const scaleInfo = Scale.get(scaleName);
                return (
                  <li key={index}>
                    {scaleName} -{" "}
                    {renderScaleNotes(
                      scaleInfo.notes,
                      notes.split(",").map((note) => Note.simplify(note.trim()))
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default WhatScale;
