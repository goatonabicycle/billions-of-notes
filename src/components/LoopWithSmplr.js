import React, { useEffect, useState } from "react";
import ClickFirst from "./ClickFirst";
import { noteToMidiNumber } from "../useful";

import { SplendidGrandPiano, Reverb } from "smplr";

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
  notePlayLength,
}) => {
  const [audioContext, setAudioContext] = useState(null);

  useEffect(() => {
    if (!audioContext) {
      const context = new AudioContext();
      setAudioContext(context);
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
    console.log("smplr note: ", note);
    if (!note) return;

    const midiNumber = noteToMidiNumber(note);

    if (audioContext && audioContext.state === "running") {
      audioContext.resume();
      const piano = new SplendidGrandPiano(audioContext);

      console.log("smplr piano: ", piano);
      piano.start({ note: "C4" });

      // midiSoundsRef.current.playChordNow(
      //   instrument,
      //   [midiNumber],
      //   notePlayLength
      // );
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
