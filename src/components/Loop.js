import React, { useEffect, useRef, useState } from "react";
import * as Tone from "tone";

const Loop = ({
  notes,
  bpm,
  isPlaying,
  currentIndex,
  setCurrentIndex,
  volume,
  notePlayLength,
  instrument = "Synth",
  tieTogether,
}) => {
  const [toneStarted, setToneStarted] = useState(false);
  const instrumentRef = useRef(null);
  const partRef = useRef(null);
  const lastNoteRef = useRef(null);

  const setupInstrument = async () => {
    console.log("Setting up instrument:", instrument);
    const instruments = {
      Synth: () => new Tone.Synth().toDestination(),
      AMSynth: () => new Tone.AMSynth().toDestination(),
      FMSynth: () => new Tone.FMSynth().toDestination(),
      MonoSynth: () => new Tone.MonoSynth().toDestination(),
    };

    if (instrumentRef.current) {
      await instrumentRef.current.dispose();
    }
    instrumentRef.current = instruments[instrument]();
    instrumentRef.current.volume.value = Tone.gainToDb(volume / 10);
    console.log("Instrument set up:", instrumentRef.current);
  };

  const setupLoop = () => {
    if (partRef.current) {
      partRef.current.dispose();
    }

    const part = new Tone.Part(
      (time, { note, index }) => {
        if (lastNoteRef.current) {
          instrumentRef.current.triggerRelease(time);
          lastNoteRef.current = null;
        }
        if (note) {
          if (!(tieTogether && index > 0 && note === notes[index - 1])) {
            instrumentRef.current.triggerAttack(note, time);
            lastNoteRef.current = note;
            Tone.Transport.schedule((t) => {
              if (lastNoteRef.current === note) {
                instrumentRef.current.triggerRelease(t);
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
    partRef.current = part;
  };

  useEffect(() => {
    const startAudio = async () => {
      if (Tone.context.state !== "running") {
        await Tone.start();
        console.log("Tone started");
      }
      setToneStarted(true);
    };

    startAudio();
  }, []);

  useEffect(() => {
    console.log("Instrument or volume changed");
    setupInstrument().then(() => {
      if (isPlaying) {
        Tone.Transport.stop();
        setupLoop();
        Tone.Transport.start();
        partRef.current.start(0);
      }
    });
  }, [instrument, volume]);

  useEffect(() => {
    if (!notes || notes.length === 0) return;

    Tone.Transport.bpm.value = bpm;

    setupLoop();

    if (isPlaying) {
      Tone.Transport.start();
      partRef.current.start(0);
    } else {
      Tone.Transport.stop();
      if (partRef.current) partRef.current.stop();
      if (instrumentRef.current) instrumentRef.current.triggerRelease("+0");
      lastNoteRef.current = null;
    }

    return () => {
      if (partRef.current) {
        partRef.current.stop();
        partRef.current.dispose();
      }
      Tone.Transport.stop();
      if (instrumentRef.current) instrumentRef.current.triggerRelease("+0");
      lastNoteRef.current = null;
    };
  }, [notes, bpm, isPlaying, notePlayLength, tieTogether, setCurrentIndex]);

  if (!toneStarted) {
    return <div>Loading audio...</div>;
  }

  return null;
};

export default Loop;
