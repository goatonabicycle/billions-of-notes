import React, { useEffect, useRef, useMemo, useCallback } from "react";
import ClickFirst from "./ClickFirst";
import { noteToMidiNumber } from "../useful";

const audioContext = new AudioContext();

function calculateInterval(bpm) {
  return 60000 / bpm;
}

const LoopComponent = ({
  notes,
  bpm,
  isPlaying,
  currentIndex,
  setCurrentIndex,
  midiSoundsRef,
  instrument,
  volume,
  notePlayLength,
}) => {
  const interval = useMemo(() => calculateInterval(bpm), [bpm]);
  const midiNumber = useMemo(
    () => noteToMidiNumber(notes[currentIndex]),
    [notes, currentIndex]
  );
  const playNotes = useRef();

  useEffect(() => {
    midiSoundsRef.current.setMasterVolume(volume);
  }, [volume]);

  useEffect(() => {
    if (!midiNumber || !isPlaying) return;
    if (audioContext && audioContext.state === "running") {
      midiSoundsRef.current.playChordNow(
        instrument,
        [midiNumber],
        notePlayLength
      );
    }
  }, [midiNumber, midiSoundsRef, isPlaying, instrument, notePlayLength]);

  const animateNotes = useCallback(
    (startTime) => {
      let lastNoteTime = startTime;

      playNotes.current = (timestamp) => {
        if (!isPlaying) return;

        if (timestamp - lastNoteTime > interval) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % notes.length);
          lastNoteTime = timestamp;
        }

        requestAnimationFrame(playNotes.current);
      };

      requestAnimationFrame(playNotes.current);
    },
    [isPlaying, interval, notes.length, setCurrentIndex]
  );

  useEffect(() => {
    animateNotes(performance.now());
  }, [isPlaying, animateNotes]);

  if (!audioContext || audioContext.state !== "running") {
    return <ClickFirst onClick={() => audioContext?.resume()} />;
  } else {
    return null;
  }
};

export default LoopComponent;
