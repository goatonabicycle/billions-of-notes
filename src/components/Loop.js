import React, { useEffect } from "react";

import ClickFirst from "./ClickFirst";
import { KEYS } from "../useful";

const LoopComponent = ({
  notes,
  bpm,
  isPlaying,
  setCurrentNote,
  currentIndex,
  setCurrentIndex,
  midiSoundsRef,
  instrument,
  volume,
}) => {
  let audioContext = new AudioContext();

  useEffect(() => {
    setCurrentNote(notes[currentIndex]);
  }, [notes, currentIndex]);

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

  useEffect(() => {
    const note = notes[currentIndex];
    if (!note) return;

    const keyNumber = note.slice(0, -1);
    const octave = note.slice(-1);

    let midiNumber = KEYS.indexOf(keyNumber);
    if (midiNumber === -1) {
      console.error("Invalid note:", note);
      return;
    }

    midiNumber += octave * 12;

    if (audioContext.state === "running")
      midiSoundsRef.current.playChordNow(instrument, [midiNumber], 1); // Turn this last item into a "palm mute" option?
  }, [notes, currentIndex, midiSoundsRef]);

  useEffect(() => {
    midiSoundsRef.current.setMasterVolume(volume);
  }, [volume]);

  const calculateInterval = (bpm) => {
    const millisecondsPerBeat = 60000 / bpm;
    return millisecondsPerBeat;
  };

  if (audioContext.state !== "running")
    return <ClickFirst onClick={() => {}} />;
  else return null;
};

export default LoopComponent;
