import React, { useEffect, useRef, useMemo } from "react";
import ClickFirst from "./ClickFirst";

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
  volume,
  notePlayLength,
  playableInstrument,
  tieTogether,
}) => {
  const interval = useMemo(() => calculateInterval(bpm), [bpm]);
  const playNotes = useRef();

  useEffect(() => {
    if (playableInstrument && volume)
      playableInstrument.out.gain.value = Math.round(volume / 10);
  }, [volume, playableInstrument]);

  useEffect(() => {
    if (!isPlaying) return;
    if (audioContext && audioContext.state === "running") {
      // How do I handle notePlayLength here?

      if (tieTogether) {
        if (notes[currentIndex] == notes[currentIndex - 1]) return;
      }

      if (playableInstrument)
        playableInstrument.play(
          notes[currentIndex],
          playableInstrument.currentTime,
          { duration: notePlayLength / 10 }
        );
    }
  }, [isPlaying, notePlayLength, playableInstrument, currentIndex, notes]);

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
