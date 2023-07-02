import React, { useEffect, useState } from "react";
import ClickFirst from "./ClickFirst";
import { noteToMidiNumber } from "../useful";

function calculateInterval(bpm) {
  const millisecondsPerBeat = 60000 / bpm;
  return millisecondsPerBeat;
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
}) => {
  const [audioContext, setAudioContext] = useState(null);

  useEffect(() => {
    if (!audioContext) {
      const ctx = new AudioContext();
      setAudioContext(ctx);
    }

    return () => {
      if (audioContext) {
        audioContext.close();
        setAudioContext(null);
      }
    };
  }, [audioContext]);

  // This is what's actually playing the note.
  useEffect(() => {
    const note = notes[currentIndex];
    if (!note) return;

    const midiNumber = noteToMidiNumber(note);

    if (audioContext && audioContext.state === "running") {
      midiSoundsRef.current.playChordNow(instrument, [midiNumber], 1);
    }
  }, [notes, currentIndex, midiSoundsRef]);

  // This handles the volume magic.
  useEffect(() => {
    midiSoundsRef.current.setMasterVolume(volume);
  }, [volume]);

  useEffect(() => {
    if (!setCurrentIndex || notes.length === 0) return;

    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % notes.length);
      }, calculateInterval(bpm));
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [notes, bpm, isPlaying]);

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
