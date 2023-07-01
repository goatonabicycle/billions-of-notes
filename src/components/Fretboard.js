import React, { useEffect, useState } from "react";
import "./Fretboard.css";
import { KEYS } from "../useful";

const SecondFretboard = ({
  notesToPlay,
  playbackIndex,
  preferredPosition,
  fingerRange,
  scaleNotes,
}) => {
  const strings = [
    { note: "E", octave: 4 },
    { note: "B", octave: 3 },
    { note: "G", octave: 3 },
    { note: "D", octave: 3 },
    { note: "A", octave: 2 },
    { note: "E", octave: 2 },
    { note: "B", octave: 1 },
  ];

  const specialFrets = [3, 5, 7, 9, 15, 17, 19, 21];
  const doubleDotsFrets = [12, 24];
  // Todo: Add these dots

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
      closestNote = fretboard
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
    }

    updateCurrentPosition({
      stringIndex: closestNote.stringIndex,
      fret: closestNote.fret,
    });
  }, [fretboard, notesToPlay, playbackIndex, preferredPosition]);

  return (
    <div className="fretboard-container">
      <div
        className="fretboard"
        style={{
          "--preferred-start": getPreferredFretRange().startFret,
          "--preferred-range":
            getPreferredFretRange().endFret -
            getPreferredFretRange().startFret +
            1,
        }}>
        {fretboard.map((string, i) => (
          <div
            key={i}
            className="string"
            style={{
              "--preferred-start": getPreferredFretRange().startFret,
              "--preferred-range":
                getPreferredFretRange().endFret -
                getPreferredFretRange().startFret +
                1,
            }}>
            {string.map((note, j) => {
              const isCurrentNote =
                note.note === notesToPlay[playbackIndex] &&
                note.stringIndex === currentPosition.stringIndex &&
                note.fret === currentPosition.fret;

              const isScaleNote = scaleNotes.includes(note.note.slice(0, -1));
              const isNoteToPlay = notesToPlay.includes(note.note);
              const isSpecialFret = specialFrets.includes(j);
              const isDoubleDotFret = doubleDotsFrets.includes(j);

              let className = "fret";
              if (isCurrentNote) className += " highlight";
              if (isScaleNote) className += " scale-note";
              if (isNoteToPlay) className += " note-to-play";
              if (isSpecialFret) className += " special-fret";
              if (isDoubleDotFret) className += " double-dot-fret";

              return (
                <div
                  key={j}
                  className={className}>
                  {note.note}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="fret-numbers">
        {[...Array(25)].map((_, i) => (
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

export default SecondFretboard;
