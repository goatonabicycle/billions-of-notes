import React, { useEffect, useState } from "react";
import "./SecondFretboard.css"; // Import a CSS file to style your component

const SecondFretboard = ({ notesToPlay, playbackIndex }) => {
  const strings = [
    { note: "E", octave: 4 },
    { note: "B", octave: 3 },
    { note: "G", octave: 3 },
    { note: "D", octave: 3 },
    { note: "A", octave: 2 },
    { note: "E", octave: 2 },
    { note: "B", octave: 1 },
  ];
  const chroma = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];

  const [fretboard, setFretboard] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({
    stringIndex: 0,
    fret: 0,
  });

  const getNote = (stringNote, stringOctave, fret) => {
    let noteIndex = (chroma.indexOf(stringNote) + fret) % chroma.length;
    let octaveJump =
      chroma.indexOf(stringNote) + fret >= 12 && chroma[noteIndex] === "C"
        ? 1
        : 0;
    let octave =
      stringOctave +
      Math.floor((chroma.indexOf(stringNote) + fret) / 12) +
      octaveJump;
    return `${chroma[noteIndex]}${octave}`;
  };

  useEffect(() => {
    let newFretboard = strings.map(({ note, octave }, stringIndex) =>
      [...Array(25)].map((e, fret) => ({
        note: getNote(note, octave, fret),
        stringIndex,
        fret,
      }))
    );
    setFretboard(newFretboard);
  }, []);

  useEffect(() => {
    const currentNote = notesToPlay[playbackIndex];
    if (!currentNote) {
      return;
    }

    let closestNote = fretboard
      .flat()
      .filter((note) => note.note === currentNote)
      .reduce((prev, curr) => {
        const prevDistance =
          Math.abs(prev.stringIndex - currentPosition.stringIndex) +
          Math.abs(prev.fret - currentPosition.fret);
        const currDistance =
          Math.abs(curr.stringIndex - currentPosition.stringIndex) +
          Math.abs(curr.fret - currentPosition.fret);
        return currDistance < prevDistance ? curr : prev;
      });

    setCurrentPosition({
      stringIndex: closestNote.stringIndex,
      fret: closestNote.fret,
    });
  }, [fretboard, notesToPlay, playbackIndex, currentPosition]);

  return (
    <div className="fretboard">
      {fretboard.map((string, i) => (
        <div
          key={i}
          className="string">
          {string.map((note, j) => (
            <div
              key={j}
              className={
                note.note === notesToPlay[playbackIndex] &&
                note.stringIndex === currentPosition.stringIndex &&
                note.fret === currentPosition.fret
                  ? "fret highlight"
                  : "fret"
              }>
              {note.note}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SecondFretboard;
