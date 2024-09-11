import React, { useEffect, useRef } from "react";
import * as Tone from "tone";
import ClickFirst from "./ClickFirst";

const LoopComponent = ({
  notes,
  bpm,
  isPlaying,
  currentIndex,
  setCurrentIndex,
  volume,
  notePlayLength,
  instrumentType = "Synth",
  tieTogether,
}) => {
  const instrumentRef = useRef(null);
  const partRef = useRef(null);
  const lastNoteRef = useRef(null);

  useEffect(() => {
    const instruments = {
      Synth: () => new Tone.Synth().toDestination(),
      AMSynth: () => new Tone.AMSynth().toDestination(),
      FMSynth: () => new Tone.FMSynth().toDestination(),
      MonoSynth: () => new Tone.MonoSynth().toDestination(),
    };

    if (instrumentRef.current) {
      instrumentRef.current.dispose();
    }

    instrumentRef.current = instruments[instrumentType]();

    return () => {
      if (instrumentRef.current) {
        instrumentRef.current.dispose();
      }
    };
  }, [instrumentType]);

  useEffect(() => {
    if (instrumentRef.current) {
      instrumentRef.current.volume.value = Tone.gainToDb(volume / 10);
    }
  }, [volume]);

  useEffect(() => {
    if (!notes || notes.length === 0) return;

    if (partRef.current) {
      partRef.current.dispose();
    }

    const instrument = instrumentRef.current;

    const part = new Tone.Part(
      (time, { note, index }) => {
        if (lastNoteRef.current) {
          instrument.triggerRelease(time);
          lastNoteRef.current = null;
        }

        if (note) {
          if (!(tieTogether && index > 0 && note === notes[index - 1])) {
            instrument.triggerAttack(note, time);
            lastNoteRef.current = note;

            Tone.Transport.schedule((t) => {
              if (lastNoteRef.current === note) {
                instrument.triggerRelease(t);
                lastNoteRef.current = null;
              }
            }, time + notePlayLength / 10);
          }
        }

        Tone.Draw.schedule(() => {
          setCurrentIndex(index);
        }, time);
      },
      notes.map((note, index) => ({ time: index * (60 / bpm), note, index }))
    );

    part.loop = true;
    part.loopEnd = notes.length * (60 / bpm);

    if (isPlaying) {
      Tone.Transport.bpm.value = bpm;
      Tone.Transport.start();
      part.start(0);
    } else {
      part.stop();
      instrument.triggerRelease("+0");
      lastNoteRef.current = null;
    }

    partRef.current = part;

    return () => {
      if (partRef.current) {
        partRef.current.stop();
        partRef.current.dispose();
      }
      instrument.triggerRelease("+0");
      lastNoteRef.current = null;
    };
  }, [notes, bpm, isPlaying, notePlayLength, tieTogether, setCurrentIndex]);

  if (Tone.context.state !== "running") {
    return <ClickFirst onClick={() => Tone.start()} />;
  } else {
    return null;
  }
};

export default LoopComponent;
