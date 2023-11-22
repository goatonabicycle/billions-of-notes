// InstrumentPlayer.js
import React, { useState, useEffect } from "react";
import {
  NOTES,
  DEFAULT_TEMPO,
  DEFAULT_VOLUME,
  TEMPO_SLIDER,
  VOLUME_SLIDER,
} from "../constants";

export const InstrumentPlayer = ({ currentInstrument, instrumentName }) => {
  const [noteIndex, setNoteIndex] = useState(0);
  const [tempo, setTempo] = useState(DEFAULT_TEMPO);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);

  useEffect(() => {
    if (currentInstrument) {
      const intervalDuration = (60 / tempo) * 1000;
      const intervalId = setInterval(() => {
        currentInstrument.play(NOTES[noteIndex]);
        setNoteIndex((prevIndex) => (prevIndex + 1) % NOTES.length);
      }, intervalDuration);

      return () => clearInterval(intervalId);
    }
  }, [currentInstrument, noteIndex, tempo]);

  const handleTempoChange = (event) => {
    setTempo(Number(event.target.value));
  };

  const handleVolumeChange = (event) => {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);
    if (currentInstrument && currentInstrument.audioNode) {
      currentInstrument.audioNode.gain.value = newVolume;
    }
  };

  return (
    <div>
      <p>Current Instrument: {instrumentName}</p>
      <p>Current Note: {NOTES[noteIndex]}</p>
      <p>Tempo: {tempo} BPM</p>
      <p>Volume: {Math.round(volume * 100)}%</p>
      <input
        type="range"
        min={TEMPO_SLIDER.min}
        max={TEMPO_SLIDER.max}
        value={tempo}
        onChange={handleTempoChange}
      />
      <input
        type="range"
        min={VOLUME_SLIDER.min}
        max={VOLUME_SLIDER.max}
        step={VOLUME_SLIDER.step}
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
};
