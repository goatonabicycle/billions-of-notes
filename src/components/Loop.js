import React, { useEffect, useRef, useMemo } from "react";
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
    if (volume) midiSoundsRef.current.setMasterVolume(volume);
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

  useEffect(() => {
    let animationFrameId;

    function animateNotes(startTime) {
      let lastNoteTime = startTime;
      let expectedTime = startTime + interval;

      playNotes.current = (timestamp) => {
        if (!isPlaying) return;

        const elapsedTime = timestamp - lastNoteTime;

        if (elapsedTime > interval) {
          const drift = timestamp - expectedTime;

          if (elapsedTime > interval * 2) {
            lastNoteTime = timestamp;
            expectedTime = timestamp + interval;
          } else {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % notes.length);
            lastNoteTime = timestamp - drift;
            expectedTime += interval;
          }
        }

        animationFrameId = requestAnimationFrame(playNotes.current);
      };

      animationFrameId = requestAnimationFrame(playNotes.current);
    }

    animateNotes(performance.now());

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, interval, notes.length, setCurrentIndex]);

  if (!audioContext || audioContext.state !== "running") {
    return <ClickFirst onClick={() => audioContext?.resume()} />;
  } else {
    return null;
  }
};

export default LoopComponent;
