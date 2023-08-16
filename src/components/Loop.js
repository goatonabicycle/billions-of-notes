import React, { useEffect, useMemo } from "react";
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

  useEffect(() => {
    midiSoundsRef.current.setMasterVolume(volume);
  }, [volume]);

  useEffect(() => {
    const note = notes[currentIndex];
    if (!note) return;

    const midiNumber = noteToMidiNumber(note);

    if (audioContext && audioContext.state === "running") {
      midiSoundsRef.current.playChordNow(
        instrument,
        [midiNumber],
        notePlayLength
      );
    }
  }, [notes, currentIndex, midiSoundsRef]);

  useEffect(() => {
    if (!setCurrentIndex || !notes.length) return;

    let intervalId;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % notes.length);
      }, interval);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [notes, interval, isPlaying]);

  if (!audioContext || audioContext.state !== "running") {
    return (
      <ClickFirst
        onClick={() => {
          if (audioContext) audioContext.resume();
        }}
      />
    );
  } else {
    return null;
  }
};

export default LoopComponent;
