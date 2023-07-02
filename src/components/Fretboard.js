import React, { useEffect, useState } from "react";

import { KEYS, OCTAVES } from "../useful";

import Modal from "./Modal.js";
import Select from "./Select";
import { ChangeTuningIcon } from "./Icons";

import "./Fretboard.css";

const Fretboard = ({
  notesToPlay,
  playbackIndex,
  preferredPosition,
  fingerRange,
  scaleNotes,
  strings,
  selectedTuning,
  setSelectedTuning,
  initialTuning,
  numberOfFrets,
}) => {
  const hasTuningChanged =
    JSON.stringify(selectedTuning) !== JSON.stringify(initialTuning);

  const updateCurrentPosition = (newPosition) => {
    setCurrentPosition(newPosition);
  };

  const getPreferredFretRange = () => {
    const startFret = preferredPosition;
    const endFret = preferredPosition + (fingerRange - 1);
    return { startFret, endFret };
  };

  const [fretboard, setFretboard] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({
    stringIndex: 0,
    fret: 0,
  });

  const getNote = (stringNote, stringOctave, fret) => {
    let noteIndex = (KEYS.indexOf(stringNote) + fret) % KEYS.length;
    let octave =
      stringOctave +
      Math.floor((KEYS.indexOf(stringNote) + fret) / KEYS.length);

    return `${KEYS[noteIndex]}${octave}`;
  };

  useEffect(() => {
    let newFretboard = strings.map(({ note, octave }, stringIndex) =>
      [...Array(numberOfFrets + 1)].map((e, fret) => ({
        note: getNote(note, octave, fret),
        stringIndex,
        fret,
      }))
    );
    setFretboard(newFretboard);
  }, [strings, selectedTuning, numberOfFrets]);

  useEffect(() => {
    const currentNote = notesToPlay[playbackIndex];
    if (!currentNote) {
      return;
    }

    const { startFret, endFret } = getPreferredFretRange();

    let notesInRange = fretboard
      .flat()
      .filter(
        (note) =>
          note.note === currentNote &&
          note.fret >= startFret &&
          note.fret <= endFret
      );

    let closestNote;

    if (notesInRange.length > 0) {
      closestNote = notesInRange.reduce((prev, curr) => {
        const prevDistance =
          Math.abs(prev.stringIndex - currentPosition.stringIndex) +
          Math.abs(prev.fret - currentPosition.fret);
        const currDistance =
          Math.abs(curr.stringIndex - currentPosition.stringIndex) +
          Math.abs(curr.fret - currentPosition.fret);
        return currDistance < prevDistance ? curr : prev;
      });
    } else {
      let potentialNotes = fretboard
        .flat()
        .filter((note) => note.note === currentNote);

      if (potentialNotes.length > 0) {
        closestNote = potentialNotes.reduce((prev, curr) => {
          const prevDistance =
            Math.abs(prev.stringIndex - currentPosition.stringIndex) +
            Math.abs(prev.fret - currentPosition.fret);
          const currDistance =
            Math.abs(curr.stringIndex - currentPosition.stringIndex) +
            Math.abs(curr.fret - currentPosition.fret);
          return currDistance < prevDistance ? curr : prev;
        });
      }
    }

    updateCurrentPosition({
      stringIndex: closestNote && closestNote.stringIndex,
      fret: closestNote && closestNote.fret,
    });
  }, [fretboard, notesToPlay, playbackIndex, preferredPosition]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStringIndex, setModalStringIndex] = useState(null);

  return (
    <div className="fretboard-container">
      {hasTuningChanged && (
        <button
          className="rainbow-button reset-button"
          onClick={() =>
            setSelectedTuning(JSON.parse(JSON.stringify(initialTuning)))
          }>
          Reset
        </button>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}>
        <Select
          id="noteSelect"
          label="Note"
          options={KEYS.map((key) => ({ value: key, label: key }))}
          selectedValue={selectedTuning[modalStringIndex]?.note || ""}
          onChange={(newNote) => {
            setSelectedTuning((prevTuning) => {
              const newTuning = [...prevTuning];
              newTuning[modalStringIndex].note = newNote;
              return newTuning;
            });
          }}
        />
        <Select
          id="octaveSelect"
          label="Octave"
          options={OCTAVES.map((octave) => ({
            value: octave,
            label: octave.toString(),
          }))}
          selectedValue={selectedTuning[modalStringIndex]?.octave || ""}
          onChange={(newOctave) => {
            setSelectedTuning((prevTuning) => {
              const newTuning = [...prevTuning];
              newTuning[modalStringIndex].octave = parseInt(newOctave, 10);
              return newTuning;
            });
          }}
        />
      </Modal>

      <div
        className="fretboard"
        style={{
          "--number-of-frets": numberOfFrets + 1,
          "--preferred-start": getPreferredFretRange().startFret,
          "--preferred-range":
            getPreferredFretRange().endFret -
            getPreferredFretRange().startFret +
            1,
        }}>
        {fretboard.map((string, stringIndex) => (
          <div
            key={stringIndex}
            className="string">
            {string.map((note, j) => {
              const isCurrentNote =
                note.note === notesToPlay[playbackIndex] &&
                note.stringIndex === currentPosition.stringIndex &&
                note.fret === currentPosition.fret;

              const isScaleNote = scaleNotes.includes(note.note.slice(0, -1));
              const isNoteToPlay = notesToPlay.includes(note.note);
              let className = "fret";
              if (isCurrentNote) className += " highlight";
              if (isScaleNote) className += " scale-note";
              if (isNoteToPlay) className += " note-to-play";

              return (
                <div
                  key={j}
                  className={className + (j === 0 ? " tuning-adjuster" : "")}
                  onClick={() => {
                    if (j === 0) {
                      setModalStringIndex(stringIndex);
                      setIsModalOpen(true);
                    }
                  }}>
                  {j === 0 && ChangeTuningIcon}
                  {note.note}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="fret-numbers">
        {[...Array(numberOfFrets + 1)].map((_, i) => (
          <div
            key={i}
            className="fret-number">
            {i}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fretboard;
